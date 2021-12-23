import AsyncStorage from "@react-native-async-storage/async-storage";
import { configure, makeAutoObservable } from "mobx";

configure({
    // enforceActions: 'never',
    // useProxies: 'never'
});

export default class CommonStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export const commonStore = new CommonStore();
