import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
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
    user_id: number;
    created_at: Date;
    updated_at: Date;
}
