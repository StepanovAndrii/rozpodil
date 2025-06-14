import { BaseToast } from "../base-toast";
import { ToastType } from "../toast-types";

export class ErrorToast extends BaseToast{
    constructor(
        message: string
    ) {
        super(ToastType.Error, message);
    }
}