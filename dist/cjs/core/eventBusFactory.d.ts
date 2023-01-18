import { IEventBus } from "../iEventBus";
declare class EventBusFactory {
    private static eventBus;
    static getEventBus(): IEventBus;
}
export { EventBusFactory };
