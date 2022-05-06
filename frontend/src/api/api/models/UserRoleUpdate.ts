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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UserRoleUpdate
 */
export interface UserRoleUpdate {
    /**
     * 
     * @type {string}
     * @memberof UserRoleUpdate
     */
    role?: string;
}

export function UserRoleUpdateFromJSON(json: any): UserRoleUpdate {
    return UserRoleUpdateFromJSONTyped(json, false);
}

export function UserRoleUpdateFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRoleUpdate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'role': !exists(json, 'role') ? undefined : json['role'],
    };
}

export function UserRoleUpdateToJSON(value?: UserRoleUpdate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'role': value.role,
    };
}
