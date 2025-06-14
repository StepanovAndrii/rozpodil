import { UUID } from "crypto";

export interface IRoom {
    id: UUID,
    name: string,
    code: string
}