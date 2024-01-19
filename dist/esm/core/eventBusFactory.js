import EventBus from "./eventBus";
import LocalStorageBuffer from "./localStorageBuffer";
class EventBusFactory {
    static getEventBus(browser, config) {
        if (!EventBusFactory.eventBus) {
            const localStorage = new LocalStorageBuffer(browser);
            EventBusFactory.eventBus = new EventBus(config, localStorage);
        }
        return EventBusFactory.eventBus;
    }
}
export { EventBusFactory };
