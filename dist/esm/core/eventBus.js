export default class EventBus {
    constructor(config, storage) {
        this.listeners = new Map();
        this.config = config;
        this.storage = storage;
        this.storage.registerListener(async (map) => {
            await this.handle(map);
        });
    }
    async send(topic, data) {
        const key = topic + this.config.delimiter + this.getTime();
        return await this.storage.save(key, {
            isEmpty: this.isEmptyEvent(data),
            data: data
        });
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
    hasSubscribers(topic) {
        return this.listeners.has(topic);
    }
    async handle(map) {
        for (let [key, value] of map.entries()) {
            const topic = key.split(this.config.delimiter)[0];
            if (key.includes(topic) && this.isNewEvent(value)) {
                console.log('Handling event with id: ' + key);
                const listeners = this.listeners.get(topic);
                if (listeners && listeners.length > 0) {
                    for (const listener of listeners) {
                        const data = value.newValue.data;
                        if (this.isEmptyEvent(data)) {
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
}
