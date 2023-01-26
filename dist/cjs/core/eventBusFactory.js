"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusFactory = void 0;
const eventBus_1 = __importDefault(require("./eventBus"));
const localStorage_1 = __importDefault(require("./localStorage"));
const webextension_polyfill_1 = __importDefault(require("webextension-polyfill"));
const browser = webextension_polyfill_1.default;
class EventBusFactory {
    static getEventBus(config) {
        if (!EventBusFactory.eventBus) {
            const localStorage = new localStorage_1.default(browser);
            const bus = new eventBus_1.default(config, localStorage);
            EventBusFactory.eventBus = bus;
        }
        return EventBusFactory.eventBus;
    }
}
exports.EventBusFactory = EventBusFactory;
