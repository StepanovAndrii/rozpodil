import { BaseToast } from "../base-toast";
import { ToastType } from "../toast-types";

export class WarningToast extends BaseToast{
    constructor(
        message: string
    ) {
        super(ToastType.Warning, message);
    }
}