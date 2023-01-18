"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor(storage) {
        this.delimiter = '_';
        this.listeners = new Map();
        this.storage = storage;
        this.storage.registerListener(async (map) => {
            await this.handle(map);
        });
    }
    async send(topic, data) {
        const key = topic + this.delimiter + this.getTime();
        return await this.storage.save(key, data);
    }
    async subscribe(topic, f) {
        const temp = this.listeners.get(topic);
        if (!temp) {
            this.listeners.set(topic, [f]);
            return;
        }
        temp.push(f);
        this.listeners.set(topic, temp);
    }
    async handle(map) {
        for (let [key, value] of map.entries()) {
            const topic = key.split(this.delimiter)[0];
            if (key.includes(topic)) {
                console.log('Handling event with id: ' + key);
                const listeners = this.listeners.get(topic);
                if (listeners && listeners.length > 0) {
                    for (const listener of listeners) {
                        // @ts-ignore
                        listener(value.newValue);
                    }
                }
            }
        }
    }
    getTime() {
        return new Date().getTime();
    }
}
exports.default = EventBus;
