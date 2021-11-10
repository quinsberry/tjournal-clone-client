import { setCookie, parseCookies, destroyCookie } from 'nookies';
import * as next from 'next';

export class TokenService {
    private static readonly COOKIE_TOKEN_ID = 'tjournal-clone-cookie';

    public static getAuthentication(ctx: Pick<next.NextPageContext, 'req'> | null = null) {
        return parseCookies(ctx);
    }

    public static setToken(token: string, ctx: Pick<next.NextPageContext, 'res'> | null = null): void {
        setCookie(ctx, TokenService.COOKIE_TOKEN_ID, token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        });
    }

    public static clear(ctx: Pick<next.NextPageContext, 'res'> | null = null): void {
        destroyCookie(ctx, TokenService.COOKIE_TOKEN_ID);
    }
}
