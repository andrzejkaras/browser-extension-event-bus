class Config {
    constructor(prefix, delimiter, removeOnceReceived) {
        this.prefix = prefix;
        this.delimiter = delimiter;
        this.removeOnceReceived = removeOnceReceived;
    }
    static default() {
        return new Config(Config.DEFAULT_PREFIX, Config.DEFAULT_DELIMITER, true);
    }
    static of(prefix = Config.DEFAULT_PREFIX, delimiter = Config.DEFAULT_DELIMITER, removeOnceReceived = true) {
        return new Config(prefix, delimiter, removeOnceReceived);
    }
}
Config.DEFAULT_PREFIX = 'EEBE'; // Extension Event Bus Event
Config.DEFAULT_DELIMITER = '_'; // Extension Event Bus Event
export { Config };
