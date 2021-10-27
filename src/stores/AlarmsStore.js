import AsyncStorage from "@react-native-async-storage/async-storage";
import { configure, makeAutoObservable } from "mobx";

configure({
    // enforceActions: 'never',
    // useProxies: 'never'
});

export default class AlarmsStore {
    constructor() {
        makeAutoObservable(this);
    }

    alarms = [];
    setAlarm(alarms) {
        this.alarms = alarms;
    }
    globalDate = new Date();
    day = this.globalDate.getDay();

    // ✨ 알람 삭제
    deleteTask = async ({ id, setIsVisibleMenu }) => {
        const loadedData = await AsyncStorage.getItem("alarm");
        const parseData = JSON.parse(loadedData);
        const copy = Object.assign({}, parseData);
        delete copy[id];
        this.storeData(copy);
        setIsVisibleMenu(false);
    };

    // ✨ 로컬에 저장하기
    storeData = async (alarms) => {
        try {
            await AsyncStorage.setItem("alarm", JSON.stringify(alarms));
            this.setAlarm(alarms);
            // confirmList(alarm); // 알람이 아예 없는지 검사
        } catch (error) {
            throw error;
        }
    };

    // ✨ 알람 불러오기
    getAlarms = async ({ setIsVisibleAlarm }) => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            this.alarms = parseData || [];
            if (Object.values(parseData).length == 0) {
                setIsVisibleAlarm(false);
            } else {
                setIsVisibleAlarm(true);
            }
        } catch (error) {
            throw error;
        }
    };

    // ✨로컬에서 가져오기
    // getAlarms = async ({ setIsVisibleAlarm, filtered }) => {
    //     try {
    //         const loadedData = await AsyncStorage.getItem("alarm");
    //         const parseData = JSON.parse(loadedData);
    //         const changedDay = day ? day : 7; //일요일을 0 👉 7 변환

    //         // true면 오늘의 요일만 ,  false면 전체요일
    //         const alarm = filtered
    //             ? Object.values(parseData)
    //                   .filter((alarm) => alarm.day.includes(changedDay))
    //                   .reduce((p, v) => ({ ...p, [v.id]: v }), {})
    //             : parseData;
    //         this.alarms = alarm || [];

    //         // if (Object.values(alarm).length == 0) {
    //         //     setIsVisibleAlarm(false);
    //         // } else {
    //         //     setIsVisibleAlarm(true);
    //         // }
    //     } catch (error) {
    //         throw error;
    //     }
    // };
}

export const alarmsStore = new AlarmsStore();
