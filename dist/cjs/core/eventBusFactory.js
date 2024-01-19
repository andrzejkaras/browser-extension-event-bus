"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusFactory = void 0;
const eventBus_1 = __importDefault(require("./eventBus"));
const localStorageBuffer_1 = __importDefault(require("./localStorageBuffer"));
class EventBusFactory {
    static getEventBus(browser, config) {
        if (!EventBusFactory.eventBus) {
            const localStorage = new localStorageBuffer_1.default(browser);
            EventBusFactory.eventBus = new eventBus_1.default(config, localStorage);
        }
        return EventBusFactory.eventBus;
    }
}
exports.EventBusFactory = EventBusFactory;
