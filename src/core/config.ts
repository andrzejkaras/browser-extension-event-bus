class Config {
    public readonly delimiter: string;
    public readonly removeOnceReceived: boolean;

    private constructor(delimiter: string, removeOnceReceived: boolean) {
        this.delimiter = delimiter;
        this.removeOnceReceived = removeOnceReceived;
    }

    public static default(): Config {
        return new Config('_', false);
    }

    public static of(delimiter: string = '_', removeOnceReceived: boolean = false) {
        return new Config(delimiter, removeOnceReceived);
    }
}

export {
    Config
}