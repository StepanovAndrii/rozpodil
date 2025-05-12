import { UUID } from "crypto";

export interface TaskStatisticsCompleteUserEntry {
  userId: UUID;
  userName: string;
  completedTasks: number;
}