"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor(config, storage) {
        this.listeners = new Map();
        this.config = config;
        this.storage = storage;
        this.storage.registerListener(async (map) => {
            await this.handle(map);
        });
    }
    async send(topic, data) {
        if (!this.hasSubscribers(topic)) {
            return true;
        }
        const key = this.generateKey(topic);
        return await this.storage.save(key, {
            isEmpty: this.isEmptyEvent(data),
            data: data
        });
    }
    // TODO: subscribe for many topics at the same time
    async subscribe(topic, f) {
        const temp = this.listeners.get(topic);
        if (!temp) {
            this.listeners.set(topic, [f]);
            return;
        }
        temp.push(f);
        this.listeners.set(topic, temp);
    }
    hasSubscribers(topic) {
        return this.listeners.has(topic);
    }
    async handle(map) {
        for (let [key, value] of map.entries()) {
            const topic = this.retrieveTopic(key);
            if (key.includes(topic) && this.isNewEvent(value)) {
                console.info('[EventBus] Handling event with id: ' + key);
                const listeners = this.listeners.get(topic);
                if (listeners && listeners.length > 0) {
                    for (const listener of listeners) {
                        const data = value.newValue.data;
                        if (!this.isEmptyEvent(data)) {
                            listener(data);
                        }
                        else {
                            listener();
                        }
                    }
                    if (this.config.removeOnceReceived) {
                        await this.storage.remove(key);
                    }
                }
            }
        }
    }
    isNewEvent(value) {
        return value && !value.oldValue && value.newValue;
    }
    getTime() {
        return new Date().getTime();
    }
    isEmptyEvent(data) {
        return !data || Object.keys(data).length === 0;
    }
    generateKey(topic) {
        return this.config.prefix + this.config.delimiter + topic + this.config.delimiter + this.getTime();
    }
    retrieveTopic(key) {
        return key.split(this.config.delimiter)[1];
    }
}
exports.default = EventBus;
