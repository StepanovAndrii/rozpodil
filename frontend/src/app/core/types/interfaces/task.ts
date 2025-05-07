import { UUID } from "crypto";
import { TaskStatus } from "../task-status-enum";
import { DateTime } from "luxon";

export interface ITask {
    id: UUID,
    title: string,
    description?: string,
    statuses: TaskStatus,
    dueTime: DateTime,
    createdAt: DateTime
}