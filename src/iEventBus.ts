export interface IEventBus {
    send(topic: string, data: any): Promise<boolean>;
    subscribe(topic: string, f: Function): Promise<void>
}