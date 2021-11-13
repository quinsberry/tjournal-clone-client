import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { UserApi } from './api/user.api';
import { assertNonNull, assertType } from '../../utils/type-guards';
import { AuthApi } from './api/auth.api';
import { action, IComputedValue, makeObservable, observable } from 'mobx';
import { CommunicatorService } from '../CommunicatorService/CommunicatorService';
import { TokenService } from '../TokenService/TokenService';
import * as next from 'next';

interface ApiMethodConfig<Options> {
    prediction: (value: any) => boolean;
    data: Options;
}

type Writeable<T extends { [x: string]: any }, K extends string> = {
    [P in K]: T[P];
}

type ApiErrorsHandlerTypes =
    | ReturnType<typeof AuthApi>
    | ReturnType<typeof UserApi>;

interface ApiServiceConfig {
    instance?: AxiosInstance;
}
interface ApiServiceDependencies {
    communicatorService?: IComputedValue<CommunicatorService>;
}
export class ApiService {
    private readonly communicatorService: IComputedValue<CommunicatorService> | null;

    readonly instance;
    static instance = ApiService.getInstance();

    @observable readonly requests = ApiService.requests;
    static requests = this.getRequests(this.instance);

    constructor({ instance }: ApiServiceConfig, { communicatorService }: ApiServiceDependencies) {
        makeObservable(this);

        this.instance = instance ?? ApiService.instance;
        this.requests = ApiService.getRequests(instance);
        this.communicatorService = communicatorService ?? null;
    }


    @action.bound
    handleCaughtErrors(error: unknown) {
        if (axios.isAxiosError(error)) {
            assertNonNull(this.communicatorService);
            this.communicatorService.get().openError(error.response?.data);
        }
    }

    static handleCaughtErrors(error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data);
        } else {
            console.error(error);
        }
    }

    @action.bound
    static context(ctx: Pick<next.NextPageContext, 'req'> | null = null) {
        return new ApiService({ instance: this.getInstance(ctx) }, {});
    }

    /**
     * Method that is used to handle the difference between expected and actual server response.
     * If difference was found it throws an error.
     */
    @action.bound
    private static apiErrorsHandler<A extends ApiErrorsHandlerTypes>(apiMethods: { [K in keyof A]: A[K] }) {
        return (Object.entries(apiMethods) as [keyof A, A[keyof A]][])
            .reduce((acc, [action, fn]) => {
                // @ts-ignore ts cannot match value of the object to its key here
                acc[action] = async ({ prediction, data }: ApiMethodConfig<Parameters<typeof fn>[0]>) => {
                    // @ts-ignore ts cannot match an appropriate data to current function
                    const response = await fn(data);
                    assertType<typeof response.data>(response.data, prediction, 'The received data from the server is different from the expected one');
                    return response.data;
                };
                return acc;
            }, {} as Writeable<{[K in keyof A]: ({ prediction, data }: ApiMethodConfig<Parameters<A[K] extends (...args: any) => any ? A[K] : never>[0]>)
                => A[K] extends (...args: any) => Promise<AxiosResponse<infer U>> ? Promise<U> : never}, Extract<keyof A, string>>
            );
    }

    @action.bound
    private static getRequests(instance: AxiosInstance = ApiService.instance) {
        return {
            auth: this.apiErrorsHandler(AuthApi(instance)),
            user: this.apiErrorsHandler(UserApi(instance)),
        };
    }

    @action.bound
    private static getInstance(ctx: Pick<next.NextPageContext, 'req'> | null = null) {
        if (!process.env.SERVER_URL) {
            throw new Error('Server url has not found. Please check SERVER_URL env variable');
        }

        const token = TokenService.getAuthentication(ctx);
        return axios.create({
            baseURL: process.env.SERVER_URL,
            headers: {
                ...(token ? {Authorization: `Bearer ${token}`} : {}),
            }
        });
    }

    _hydrate(data: any) {
        console.log('ApiStore hydrated with data: ', data);
    }
}