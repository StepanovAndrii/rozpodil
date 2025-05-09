import { UUID } from "crypto";
import { TaskStatus } from "../task-status-enum";
import { DateTime } from "luxon";

export interface ITask {
    id: UUID,
    title: string,
    description?: string,
    statuses: TaskStatus,
    dueTime: string,
    createdAt: string
}

export class Task implements ITask {
    id: UUID;
    title: string;
    description?: string;
    statuses: TaskStatus;
    dueTime: string;
    createdAt: string;

    constructor(data: ITask) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.statuses = data.statuses;
        this.dueTime = data.dueTime;
        this.createdAt = data.createdAt;
    }
    
    getDueTime(): DateTime {
        return DateTime.fromISO(this.dueTime);
    }

    getCreatedAt(): DateTime {
        return DateTime.fromISO(this.createdAt);
    }
}