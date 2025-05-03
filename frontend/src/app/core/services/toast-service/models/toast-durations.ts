import { ToastType } from "./toast-types";

export const ToastDurations: Record<ToastType, number> = {
    [ToastType.Error]: 5000,
    [ToastType.Info]: 3000,
    [ToastType.Success]: 3000,
    [ToastType.Warning]: 5000
} as const;

export type ToastDuration = (typeof ToastDurations)[ToastType];