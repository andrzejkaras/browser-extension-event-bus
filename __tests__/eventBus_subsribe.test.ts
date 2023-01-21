import {ILocalStorage} from "../src/iLocalStorage";
import EventBus from "../src/core/eventBus";

describe('eventBus_subscribe.test.ts', () => {
    it('should be registered correctly',  () => {
        // given
        const inMemoryStorage = new InMemoryStorage();
        const underTest = new EventBus(inMemoryStorage);
        const topic = 'testTopic';

        // when
        underTest.subscribe(topic, console.log);

        // then
        const hasSubscribers = underTest.hasSubscribers(topic);
        expect(hasSubscribers).toBeTruthy();
    });

    it('should be registered correctly when adding more than one listener',  () => {
        // given
        const inMemoryStorage = new InMemoryStorage();
        const underTest = new EventBus(inMemoryStorage);
        const topic = 'testTopic';

        // when
        underTest.subscribe(topic, console.log);
        underTest.subscribe(topic, (data: any) => {
            console.log(JSON.stringify(data, null, 2));
        });

        // then
        const hasSubscribers = underTest.hasSubscribers(topic);
        expect(hasSubscribers).toBeTruthy();
    });
});

// TODO: move it to another file later on
class InMemoryStorage implements ILocalStorage {
    registerListener(changeListener: Function): void {
    }

    save(key: string, data: any): Promise<boolean> {
        return Promise.resolve(true);
    }
}