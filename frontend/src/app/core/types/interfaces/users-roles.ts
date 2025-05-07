import { UUID } from "crypto";
import { RoomRole } from "../room-role-enum";

// TODO: винести в окремий інтерфейс
export interface IUsersRoles {
    id: UUID,
    username: string,
    photoUrl?: string,
    role: RoomRole
};