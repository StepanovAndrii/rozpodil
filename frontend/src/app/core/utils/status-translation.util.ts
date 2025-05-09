import { RoomRole } from "../types/room-role-enum";
import { TaskStatus } from "../types/task-status-enum";

export function translatUserStatus(status: string): string {
    const translations: Record<string, string> = {
        Owner: RoomRole.Owner,
        Admin: RoomRole.Admin,
        Member: RoomRole.Member
    }

    return translations[status] || status;
}

export function translateTaskStatus(status: string): string {
    const translations: Record<string, string> = {
        Pending: TaskStatus.Pending,
        InProgress: TaskStatus.InProgress,
        Completed: TaskStatus.Completed
    }

    return translations[status] || status;
}