import { IEventBus } from "../iEventBus";
import { IEventBusBuffer } from "../iEventBusBuffer";
import { Config } from "./config";

export default class EventBus implements IEventBus {
    private config: Config;
    private storage: IEventBusBuffer;

    private listeners: Map<string, Function[]> = new Map<string, Function[]>();

    public constructor(config: Config, storage: IEventBusBuffer) {
        this.config = config;
        this.storage = storage;
        this.storage.registerListener(async (map: Map<any, any>) => {
            await this.handle(map);
        });
    }

    public async send(topic: string, data?: any): Promise<boolean> {
        if (!this.hasSubscribers(topic)) {
            return true;
        }

        const key: string = this.generateKey(topic);
        return await this.storage.save(key, {
            isEmpty: this.isEmptyEvent(data),
            data: data
        });
    }

    // TODO: subscribe for many topics at the same time
    public async subscribe(topic: string, f: Function): Promise<void> {
        const temp = this.listeners.get(topic);
        if (!temp) {
            this.listeners.set(topic, [f]);
            return;
        }

        temp.push(f);
        this.listeners.set(topic, temp);
    }

    public hasSubscribers(topic: string): boolean {
        return this.listeners.has(topic);
    }

    private async handle(map: Map<any, any>): Promise<void> {
        for (let [key, value] of map.entries()) {
            const topic: string = this.retrieveTopic(key);
            if (key.includes(topic) && this.isNewEvent(value)) {
                console.info('[EventBus] Handling event with id: ' + key);

                const listeners: Function[] | undefined = this.listeners.get(topic);
                if (listeners && listeners.length > 0) {
                    for (const listener of listeners) {
                        const data = value.newValue.data;
                        if (!this.isEmptyEvent(data)) {
                            listener(data);
                        } else {
                            listener();
                        }
                    }

                    if (this.config.removeOnceReceived) {
                        await this.storage.remove(key);
                    }
                }
            }
        }
    }

    private isNewEvent(value: any): boolean {
        return value && !value.oldValue && value.newValue;
    }

    private getTime(): number {
        return new Date().getTime();
    }

    private isEmptyEvent(data: any): boolean {
        return !data || Object.keys(data).length === 0;
    }

    private generateKey(topic: string): string {
        return this.config.prefix + this.config.delimiter + topic + this.config.delimiter + this.getTime();
    }

    private retrieveTopic(key: string): string {
        return key.split(this.config.delimiter)[1];
    }
}
