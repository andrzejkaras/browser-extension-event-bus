class Config {
    private static readonly DEFAULT_PREFIX: string = 'EEBE'; // Extension Event Bus Event
    private static readonly DEFAULT_DELIMITER: string = '_'; // Extension Event Bus Event
    public readonly prefix: string;
    public readonly delimiter: string;
    public readonly removeOnceReceived: boolean;

    private constructor(prefix: string, delimiter: string, removeOnceReceived: boolean) {
        this.prefix = prefix;
        this.delimiter = delimiter;
        this.removeOnceReceived = removeOnceReceived;
    }

    public static default(): Config {
        return new Config(Config.DEFAULT_PREFIX,Config.DEFAULT_DELIMITER, true);
    }

    public static of(prefix: string = Config.DEFAULT_PREFIX, delimiter: string = Config.DEFAULT_DELIMITER, removeOnceReceived: boolean = true) {
        return new Config(prefix, delimiter, removeOnceReceived);
    }
}

export {
    Config
}