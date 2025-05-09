import { UUID } from "crypto";
import { TaskStatus, taskStatusMap } from "../task-status-enum";
import { DateTime } from "luxon";

export interface ITask {
    id: UUID,
    title: string,
    description?: string,
    status: TaskStatus,
    dueTime: string,
    createdAt: string
}

export class Task implements ITask {
    id: UUID;
    title: string;
    description?: string;
    status: TaskStatus;
    dueTime: string;
    createdAt: string;

    constructor(data: ITask) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.status = data.status;
        this.dueTime = data.dueTime;
        this.createdAt = data.createdAt;
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

    getLocalizedStatus(): string {
        return taskStatusMap[this.status];
    }
}