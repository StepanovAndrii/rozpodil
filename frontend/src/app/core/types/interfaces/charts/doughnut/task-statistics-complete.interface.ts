import { UUID } from "crypto";
import { TaskStatisticsCompleteEntry } from "./task-statistics-complete-entry.interface";

export interface TaskStatisticsComplete {
  roomId: UUID;
  statistics: TaskStatisticsCompleteEntry[];
}