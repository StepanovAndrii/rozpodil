import { UUID } from "crypto"

export interface IUser {
    id: UUID,
    username: string,
    photoUrl: string
}