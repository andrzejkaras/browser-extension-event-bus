declare class Config {
    private static readonly DEFAULT_PREFIX;
    private static readonly DEFAULT_DELIMITER;
    readonly prefix: string;
    readonly delimiter: string;
    readonly removeOnceReceived: boolean;
    private constructor();
    static default(): Config;
    static of(prefix?: string, delimiter?: string, removeOnceReceived?: boolean): Config;
}
export { Config };
