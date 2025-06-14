import { BaseToast } from "../base-toast";
import { ToastType } from "../toast-types";

export class SuccessToast extends BaseToast{
    constructor(
        message: string
    ) {
        super(ToastType.Success, message);
    }
}