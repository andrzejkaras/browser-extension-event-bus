import { Browser, Storage } from "webextension-polyfill";
import { ILocalStorage } from "../iLocalStorage";

export default class LocalStorage implements ILocalStorage {
    private browser: Browser;
    private changeListener!: Function;
   public constructor(browser: Browser) {
       this.browser = browser;

       this.browser.storage.local.onChanged.addListener(async (changes: Storage.StorageAreaOnChangedChangesType) => {
           const map = new Map(Object.entries(changes));
           if (map.size > 0) {
               await this.changeListener(map);
           }
       });
    }

    public registerListener(changeListener: Function): void {
       if (!this.changeListener) {
           this.changeListener = changeListener;
       }
    }

    public async save(key: string, data: any): Promise<boolean> {
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
        } catch (error) {
            console.error('[EventBus] Error during saving data for key: ' + key + ' error: ' + JSON.stringify(error, null, 2));
            return false;
        }
    }
}