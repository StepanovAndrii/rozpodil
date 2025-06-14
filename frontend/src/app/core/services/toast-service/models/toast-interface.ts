import { UUID } from "crypto";
import { ToastType } from "./toast-types";
import { ToastDuration } from "./toast-durations";

export interface IToast {
    getId: () => UUID;
    getMessage: () => string;
    getType: () => ToastType;
    getDuration: () => ToastDuration;
}