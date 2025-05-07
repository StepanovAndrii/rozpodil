import { RoomRole } from "../room-role-enum";

// TODO: винести в окремий інтерфейс
export interface IUsersRoles {
    username: string,
    photoUrl?: string,
    role: RoomRole
};