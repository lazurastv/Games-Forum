import * as runtime from '../runtime';


/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {
    async register(username: string, email: string, password: string) {
        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/user/register`,
            method: 'POST',
            headers: headerParameters,

            body: {
                username: username,
                email: email,
                password: password
            },
        }, {
            mode: 'cors'
        });

        return response;
    }

    async login(username: string, password: string) {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/user/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,

            body: {
                username: username,
                password: password,
                rememberMe: false
            },
        }, {
            mode: 'cors',
            credentials: 'include'
        });

        return response;
    }

    async logout() {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/user/logout`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, {
            mode: 'cors',
            credentials: 'include'
        });

        return response;
    }
}