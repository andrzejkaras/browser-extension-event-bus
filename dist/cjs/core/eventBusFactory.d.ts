import { IEventBus } from "../iEventBus";
import { Config } from "./config";
declare class EventBusFactory {
    private static eventBus;
    static getEventBus(config: Config): IEventBus;
}
export { EventBusFactory };
