import { Browser } from "webextension-polyfill";
import { ILocalStorage } from "../iLocalStorage";
export default class LocalStorage implements ILocalStorage {
    private browser;
    private changeListener;
    constructor(browser: Browser);
    registerListener(changeListener: Function): void;
    save(key: string, data: any): Promise<boolean>;
}
