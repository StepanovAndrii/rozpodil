import { UUID } from "crypto";
import { TaskStatus } from "../task-status-enum";
import { DateTime } from "luxon";
import { IUser } from "./user-interface";

export interface ITask {
    id: UUID,
    title: string,
    description?: string,
    status: TaskStatus,
    dueTime: string,
    createdAt: string,
    assignedTo?: IUser
}

export class Task implements ITask {
    id: UUID;
    title: string;
    description?: string;
    status: TaskStatus;
    dueTime: string;
    createdAt: string;
    assignedTo?: IUser;

    constructor(data: ITask) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.dueTime = data.dueTime;
        this.createdAt = data.createdAt;
        this.assignedTo = data.assignedTo;
    }

    getDueTime(): DateTime {
        return DateTime.fromISO(this.dueTime);
    }

    getCreatedAt(): DateTime {
        return DateTime.fromISO(this.createdAt);
    }

    toEnum(value: string): TaskStatus | undefined {
        return TaskStatus[value as keyof typeof TaskStatus];
    }
}