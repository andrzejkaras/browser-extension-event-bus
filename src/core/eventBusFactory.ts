import EventBus from "./eventBus";
import LocalStorageBuffer from "./localStorageBuffer";
import {IEventBus} from "../iEventBus";
import {Config} from "./config";
import {Browser} from "webextension-polyfill";

class EventBusFactory {
    private static eventBus: IEventBus;

    public static getEventBus(browser: Browser, config: Config): IEventBus {
        if (!EventBusFactory.eventBus) {
            const localStorage = new LocalStorageBuffer(browser);
            EventBusFactory.eventBus = new EventBus(config, localStorage);
        }

        return EventBusFactory.eventBus;
    }
}

export {
    EventBusFactory
}
