import { Config } from "ziggy-js";

export interface User {
    id: string;
    username: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export interface SubmissionItem {
    id: string;
    title: string;
    url: string;
    text: string;
    username: string;
    user_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface ReplyItem {
    id: string;
    text: string;
    username: string;
    user_id: string;
    reply_id: string;
    submission_id: string;
    visibility: number;
    created_at: Date;
    updated_at: Date;
}
