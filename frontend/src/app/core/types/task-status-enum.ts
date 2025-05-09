export enum TaskStatus {
    Pending = "Pending",
    InProgress = "In progress",
    Completed = "Completed"
}
export const taskStatusMap: { [key in TaskStatus]: string } = {
    [TaskStatus.Pending]: "Створено",
    [TaskStatus.InProgress]: "В процесі",
    [TaskStatus.Completed]: "Завершено"
};
