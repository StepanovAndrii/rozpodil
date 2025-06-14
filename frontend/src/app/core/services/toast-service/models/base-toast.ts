import { ToastDuration, ToastDurations } from "./toast-durations";
import { ToastType } from "./toast-types";
import { UUID } from "crypto";
import { IToast } from "./toast-interface";

export abstract class BaseToast implements IToast{
    private readonly _id: UUID;
    private readonly _message: string;
    private readonly _type: ToastType;
    private readonly _duration: ToastDuration;

    constructor(
        type: ToastType,
        message: string
    ) {
        this._id = crypto.randomUUID();
        this._type = type;
        this._duration = ToastDurations[type];
        this._message = message;
    }
    public getId: () => UUID = (): UUID => this._id;
    public getMessage: () => string = (): string => this._message;
    public getType: () => ToastType = (): ToastType => this._type;
    public getDuration:() => number = (): number => this._duration;
}