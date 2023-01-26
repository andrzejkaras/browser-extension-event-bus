import EventBus from "./eventBus";
import LocalStorage from "./localStorage";
import { IEventBus } from "../iEventBus";
import Browser from 'webextension-polyfill'
import { Config } from "./config";
const browser = Browser;

class EventBusFactory {
    private static eventBus: IEventBus;

    public static getEventBus(config: Config): IEventBus {
        if (!EventBusFactory.eventBus) {
            const localStorage = new LocalStorage(browser);
            const bus = new EventBus(config, localStorage);
            EventBusFactory.eventBus = bus;
        }

        return EventBusFactory.eventBus;
    }
}

export {
    EventBusFactory
}
