import { IEventBus } from "../iEventBus";
import { Config } from "./config";
import { Browser } from "webextension-polyfill";
declare class EventBusFactory {
    private static eventBus;
    static getEventBus(browser: Browser, config: Config): IEventBus;
}
export { EventBusFactory };
