import { IEventBus } from "../iEventBus";
import { ILocalStorage } from "../iLocalStorage";
export default class EventBus implements IEventBus {
    private readonly delimiter;
    private storage;
    private listeners;
    constructor(storage: ILocalStorage);
    send(topic: string, data: any): Promise<boolean>;
    subscribe(topic: string, f: Function): Promise<void>;
    private handle;
    private getTime;
}
