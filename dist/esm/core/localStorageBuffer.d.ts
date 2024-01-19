import { Browser } from "webextension-polyfill";
import { IEventBusBuffer } from "../iEventBusBuffer";
export default class LocalStorageBuffer implements IEventBusBuffer {
    private browser;
    private changeListener;
    constructor(browser: Browser);
    registerListener(changeListener: Function): void;
    save(key: string, data: any): Promise<boolean>;
    remove(key: string): Promise<boolean>;
    size(): number;
}
