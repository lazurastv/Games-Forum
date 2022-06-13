import { exists, mapValues } from '../runtime';

export interface ContentId {
    id: number;
}

export function ContentIdFromJSON(json: any): ContentId {
    return ContentIdFromJSONTyped(json, false);
}

export function ContentIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): ContentId {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function ContentIdToJSON(value?: ContentId | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'id': value.id,
    };
}