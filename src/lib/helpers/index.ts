import * as yup from 'yup';
import { CloudFolder } from '@/lib/types';
import { UnknownError } from './exceptions';
export const entityTypes = ["User", "Organization"] as const;

const emailRegex = new RegExp("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");

export const nameRegex = new RegExp("^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(([',. -][a-zA-ZÀ-ÿ\u00f1\u00d1 ])?[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*$");

export const isValidEmail = (email: string) => emailRegex.test(email.trim());

export function processError(error: unknown) {
    if (error instanceof Error)
        throw new Error(error.message);
    throw new UnknownError();
}

export function logError(prefixMessage: string, error: unknown) {
    if (error instanceof Error)
        console.error(prefixMessage, error.message);
    else
        console.error("Unknown Error", prefixMessage, error);
}

export function getErrorMessage(error: unknown) {
    if (error instanceof Error)
        return error.message;
    return "An unknown error occurred";
}

type StringSchemaOptions = {
    required?: boolean,
    message?: string
}

export function getStringSchema({ required = true, message }: StringSchemaOptions) {
    if (required) {
        return yup.string().required(message).transform(function (_, originalValue) {
            return (this.isType(originalValue) && originalValue) ? originalValue.trim() : originalValue;
        });
    }
    return (yup.string().transform(function (_, originalValue) {
        return (this.isType(originalValue) && originalValue) ? originalValue.trim() : originalValue;
    }))
}

export const cloudFolders = ["Users", "Organizations", "Events"] as const;

export const prefixWithCloudUrl = (folder: CloudFolder, arg: string) => {
    return `${process.env.AWS_CLOUDFRONT_URL}/${folder}${arg.startsWith("/") ? arg : `/${arg}`}`
}

export function parseToJSON<T>(arg: T): T {
    return (!!arg ? JSON.parse(JSON.stringify(arg)) : null);
}

export function getSearchRegex(searchTerm: string) {
    return new RegExp(`.*${searchTerm.trim()}.*`, 'i');
}