import { IEventBus } from "../iEventBus";
import { ILocalStorage } from "../iLocalStorage";
import { Config } from "./config";

export default class EventBus implements IEventBus {
    private config: Config;
    private storage: ILocalStorage;

    private listeners: Map<string, Function[]> = new Map<string, Function[]>();

    public constructor(config: Config, storage: ILocalStorage) {
        this.config = config;
        this.storage = storage;
        this.storage.registerListener(async (map: Map<any, any>) => {
            await this.handle(map);
        });
    }

    public async send(topic: string, data: any): Promise<boolean> {
        const key = topic + this.config.delimiter + this.getTime();
        return await this.storage.save(key, data);
    }

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
            const topic = key.split(this.config.delimiter)[0];
            if (key.includes(topic) && this.isNewEvent(value)) {
                console.log('Handling event with id: ' + key);

                const listeners: Function[] | undefined = this.listeners.get(topic);
                if (listeners && listeners.length > 0) {
                    for (const listener of listeners) {
                        // @ts-ignore
                        listener(value.newValue)
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
}