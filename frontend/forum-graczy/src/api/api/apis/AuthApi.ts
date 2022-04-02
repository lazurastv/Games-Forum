import * as runtime from '../runtime';


/**
 * 
 */
export class AuthApi extends runtime.BaseAPI {
    async login() {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/user/login`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,

            body: {
                username: "a",
                password: "p",
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