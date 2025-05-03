import { BaseToast } from "../base-toast";
import { ToastType } from "../toast-types";

export class InfoToast extends BaseToast{
    constructor(
        message: string
    ) {
        super(ToastType.Info, message);
    }
}