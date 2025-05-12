import { DateTime } from "luxon";
import { TaskStatisticsCompleteUserEntry } from "./task-statistics-complete-user-entry.interface";

export interface TaskStatisticsCompleteEntry {
  date: DateTime;
  users: TaskStatisticsCompleteUserEntry[];
}