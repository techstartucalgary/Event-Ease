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
    return `${process.env.AWS_CLOUDFRONT_URL}${folder}${arg.startsWith("/") ? arg : `/${arg}`}`
}

export function parseToJSON<T>(arg: T): T {
    return (!!arg ? JSON.parse(JSON.stringify(arg)) : null);
}

export function getSearchRegex(searchTerm: string) {
    return new RegExp(`.*${searchTerm.trim()}.*`, 'i');
}

export interface Attendee {
    id: string;
    name: string;
    role: string;
    email: string;
    team?: string;
    avatar?: string;
    checkInTime?: string;
}

export const MOCK_ATTENDEES: Attendee[] = [
    {
        id: "1",
        name: "Alice Chen",
        role: "Developer",
        email: "alice@example.com",
        team: "Team Innovate",
        checkInTime: "9:30 AM",
    },
    {
        id: "2",
        name: "Bob Smith",
        role: "Designer",
        email: "bob@example.com",
        team: "Team Innovate",
        checkInTime: "9:45 AM",
    },
    {
        id: "3",
        name: "Sarah Johnson",
        role: "Product Manager",
        email: "sarah@example.com",
        team: "Team Create",
        checkInTime: "10:15 AM",
    },
    {
        id: "4",
        name: "Mike Wilson",
        role: "Marketing",
        email: "mike@example.com",
        team: "Team Create",
        checkInTime: "10:15 AM",
    },
    {
        id: "5",
        name: "Eva Martinez",
        role: "Developer",
        email: "eva@example.com",
        team: "Team Create",
        checkInTime: "9:15 AM",
    },
];