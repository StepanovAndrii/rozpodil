import { UUID } from "crypto";

export interface AccessTokenPayload {
    exp: number;
    iat?: number;
    sub?: UUID;
    email?: string;
    [key: string]: unknown
}