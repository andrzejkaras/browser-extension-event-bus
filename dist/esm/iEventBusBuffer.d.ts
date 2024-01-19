export interface IEventBusBuffer {
    registerListener(changeListener: Function): void;
    save(key: string, data: any): Promise<boolean>;
    remove(key: string): Promise<boolean>;
    size(): number;
}
