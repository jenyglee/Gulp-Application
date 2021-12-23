import AsyncStorage from "@react-native-async-storage/async-storage";
import { configure, makeAutoObservable } from "mobx";
import { Alert } from "react-native";

configure({
    // enforceActions: 'never',
    // useProxies: 'never'
});

export default class AlarmsStore {
    constructor() {
        makeAutoObservable(this);
    }
}

export const alarmsStore = new AlarmsStore();
