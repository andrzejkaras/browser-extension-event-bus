import { IEventBus } from "../iEventBus";
import { IEventBusBuffer } from "../iEventBusBuffer";
import { Config } from "./config";
export default class EventBus implements IEventBus {
    private config;
    private storage;
    private listeners;
    constructor(config: Config, storage: IEventBusBuffer);
    send(topic: string, data?: any): Promise<boolean>;
    subscribe(topic: string, f: Function): Promise<void>;
    hasSubscribers(topic: string): boolean;
    private handle;
    private isNewEvent;
    private getTime;
    private isEmptyEvent;
    private generateKey;
    private retrieveTopic;
}
