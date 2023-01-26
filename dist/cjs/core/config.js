"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
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
exports.Config = Config;
