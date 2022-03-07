/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    LikeAdd,
    LikeAddFromJSON,
    LikeAddToJSON,
    LikeVM,
    LikeVMFromJSON,
    LikeVMToJSON,
} from '../models';

export interface AddLikeRequest {
    likeAdd: LikeAdd;
}

export interface DeleteLikeRequest {
    id: number;
}

export interface GetLikeByArticleIdRequest {
    id: number;
}

export interface GetLikeByIdRequest {
    id: number;
}

export interface GetLikeByUserIdRequest {
    id: number;
}

export interface ToggleLikeRequest {
    id: number;
}

/**
 * 
 */
export class LikeControllerApi extends runtime.BaseAPI {

    /**
     */
    async addLikeRaw(requestParameters: AddLikeRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.likeAdd === null || requestParameters.likeAdd === undefined) {
            throw new runtime.RequiredError('likeAdd','Required parameter requestParameters.likeAdd was null or undefined when calling addLike.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/like`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LikeAddToJSON(requestParameters.likeAdd),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async addLike(requestParameters: AddLikeRequest, initOverrides?: RequestInit): Promise<void> {
        await this.addLikeRaw(requestParameters, initOverrides);
    }

    /**
     */
    async deleteLikeRaw(requestParameters: DeleteLikeRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling deleteLike.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/like/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async deleteLike(requestParameters: DeleteLikeRequest, initOverrides?: RequestInit): Promise<void> {
        await this.deleteLikeRaw(requestParameters, initOverrides);
    }

    /**
     */
    async getAllLikesRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<LikeVM>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/like`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LikeVMFromJSON));
    }

    /**
     */
    async getAllLikes(initOverrides?: RequestInit): Promise<Array<LikeVM>> {
        const response = await this.getAllLikesRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async getLikeByArticleIdRaw(requestParameters: GetLikeByArticleIdRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<LikeVM>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLikeByArticleId.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/like/ArticleId/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LikeVMFromJSON));
    }

    /**
     */
    async getLikeByArticleId(requestParameters: GetLikeByArticleIdRequest, initOverrides?: RequestInit): Promise<Array<LikeVM>> {
        const response = await this.getLikeByArticleIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getLikeByIdRaw(requestParameters: GetLikeByIdRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<LikeVM>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLikeById.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/like/Id/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => LikeVMFromJSON(jsonValue));
    }

    /**
     */
    async getLikeById(requestParameters: GetLikeByIdRequest, initOverrides?: RequestInit): Promise<LikeVM> {
        const response = await this.getLikeByIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async getLikeByUserIdRaw(requestParameters: GetLikeByUserIdRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<Array<LikeVM>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getLikeByUserId.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/like/UserId/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(LikeVMFromJSON));
    }

    /**
     */
    async getLikeByUserId(requestParameters: GetLikeByUserIdRequest, initOverrides?: RequestInit): Promise<Array<LikeVM>> {
        const response = await this.getLikeByUserIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async toggleLikeRaw(requestParameters: ToggleLikeRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling toggleLike.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/api/like/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async toggleLike(requestParameters: ToggleLikeRequest, initOverrides?: RequestInit): Promise<void> {
        await this.toggleLikeRaw(requestParameters, initOverrides);
    }

}
