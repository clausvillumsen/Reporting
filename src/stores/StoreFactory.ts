import {StoreBase} from "./StoreBase";
import { StoreBaseInterface } from "./StoreInterface";

export namespace StoreFactory {
    var Stores: StoreBase[] = []
    export function GetStore(name: typeof StoreBase): StoreBase {
        console.log(`that: ${name} -- is: ${name.toString()}`)
        for(let i = 0; i<Stores.length; i++) {
            if( typeof(Stores[i]) === name.toString()) {
                return Stores[i];
            }
        }
        let store = new name()
        console.log(`what: ${store} -- is: ${store.constructor}`)
        Stores.push(store)
        return store;
    }
   
    export function Dispose() {
        Stores = [];
    }
}