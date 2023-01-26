class Config {
    constructor(delimiter, removeOnceReceived) {
        this.delimiter = delimiter;
        this.removeOnceReceived = removeOnceReceived;
    }
    static default() {
        return new Config('_', false);
    }
    static of(delimiter = '_', removeOnceReceived = false) {
        return new Config(delimiter, removeOnceReceived);
    }
}
export { Config };
