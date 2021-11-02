import axios from 'axios';
import { UserApi } from './api/user.api';
import { assertType } from '../../utils/type-guards';
import { AuthApi } from './api/auth.api';

interface ApiMethodConfig<Options> {
    prediction: (value: any) => boolean;
    data: Options;
}

type Writeable<T extends { [x: string]: any }, K extends string> = {
    [P in K]: T[P];
}

type ApiErrorsHandlerTypes =
    | typeof AuthApi
    | typeof UserApi;

export class ApiService {
    static instance = ApiService.getInstance();

    static requests = {
        auth: ApiService.ApiErrorsHandler(AuthApi),
        user: ApiService.ApiErrorsHandler(UserApi),
    };

    /**
     * Method that is used to handle the difference between expected and actual server response.
     * If difference was found it throws an error.
     */
    private static ApiErrorsHandler<A extends ApiErrorsHandlerTypes>(apiMethods: { [K in keyof A]: A[K] }) {
        return (Object.entries(apiMethods) as [keyof A, A[keyof A]][])
            .reduce((acc, [action, fn]) => {
                // @ts-ignore ts cannot match value of the object to its key here
                acc[action] = async ({ prediction, data }: ApiMethodConfig<Parameters<typeof fn>[0]>) => {
                    // @ts-ignore ts cannot match an appropriate data to current function
                    const response = await fn(data);
                    assertType<typeof response.data>(response.data, prediction, 'The received data from the server is different from the expected one');
                    return response;
                };
                return acc;
            }, {} as Writeable<{[K in keyof A]: ({ prediction, data }: ApiMethodConfig<Parameters<A[K] extends (...args: any) => any ? A[K] : never>[0]>)
                => ReturnType<A[K] extends (...args: any) => any ? A[K] : never>}, Extract<keyof A, string>>
            );
    }

    private static getInstance() {
        if (!process.env.SERVER_URL) {
            throw new Error('Server url has not found. Please check SERVER_URL env variable');
        }
        return axios.create({
            baseURL: process.env.SERVER_URL,
        });
    }
}