import EventBus from "./eventBus";
import LocalStorage from "./localStorage";
import Browser from 'webextension-polyfill';
const browser = Browser;
class EventBusFactory {
    static getEventBus() {
        if (!EventBusFactory.eventBus) {
            const localStorage = new LocalStorage(browser);
            const bus = new EventBus(localStorage);
            EventBusFactory.eventBus = bus;
        }
        return EventBusFactory.eventBus;
    }
}
export { EventBusFactory };
