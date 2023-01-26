export default class LocalStorage {
    constructor(browser) {
        this.browser = browser;
        this.browser.storage.local.onChanged.addListener(async (changes) => {
            const map = new Map(Object.entries(changes));
            if (map.size > 0) {
                await this.changeListener(map);
            }
        });
    }
    registerListener(changeListener) {
        if (!this.changeListener) {
            this.changeListener = changeListener;
        }
    }
    async save(key, data) {
        if (!key) {
            console.error('[EventBus] No key provided or key is empty');
            return false;
        }
        if (!data) {
            console.error('[EventBus] No data to write provided');
            return false;
        }
        try {
            await this.browser.storage.local.set({ [key]: data });
            console.debug('[EventBus] data under key: ' + key + ' saved successfully.');
            return true;
        }
        catch (error) {
            console.error('[EventBus] Error during saving data for key: ' + key + ' error: ' + JSON.stringify(error, null, 2));
            return false;
        }
    }
    async remove(key) {
        try {
            await this.browser.storage.local.remove(key);
            return true;
        }
        catch (e) {
            console.error('[EventBus] Error during removing data for key: ' + key);
            return false;
        }
    }
}
