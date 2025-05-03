import { BaseToast } from "../models/base-toast";
import { ToastType } from "../models/toast-types";
import { ErrorToast } from "../models/toasts-implementations.ts/error-toast";
import { InfoToast } from "../models/toasts-implementations.ts/info-toast";
import { SuccessToast } from "../models/toasts-implementations.ts/success-toast";
import { WarningToast } from "../models/toasts-implementations.ts/warning-toast";

export class ToastFactory {
    public static createToast(type: ToastType, message: string): BaseToast {
        switch (type) {
            case ToastType.Error: return new ErrorToast(message);
            case ToastType.Info: return new InfoToast(message);
            case ToastType.Warning: return new WarningToast(message);
            case ToastType.Success: return new SuccessToast(message);
            default: throw new Error('Невідомий тип спливаючого повідомлення');
        }
    }
}