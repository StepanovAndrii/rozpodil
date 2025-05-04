export interface JwtPayload {
    sub: string;
    iss: string;
    exp: number;
    aud: string;
    nameid: string;
    [key: string]: any;
}