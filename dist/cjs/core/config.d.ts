declare class Config {
    readonly delimiter: string;
    readonly removeOnceReceived: boolean;
    private constructor();
    static default(): Config;
    static of(delimiter?: string, removeOnceReceived?: boolean): Config;
}
export { Config };
