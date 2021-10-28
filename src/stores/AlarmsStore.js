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

    globalDate = new Date();
    year = this.globalDate.getFullYear();
    month = this.globalDate.getMonth();
    // date = this.globalDate.getDate();
    date = 9;
    day = this.globalDate.getDay();

    alarms = [];
    setAlarm(alarms) {
        this.alarms = alarms;
    }

    isVisibleAlarm = true;
    setIsVisibleAlarm(bool) {
        this.isVisibleAlarm = bool;
    }

    filtered = true;
    setFiltered(bool) {
        this.filtered = bool;
    }

    count = 0;
    setCount(num) {
        this.count = num;
    }

    countTotal = 0;
    setCountTotal(num) {
        this.countTotal = num;
    }

    isVisibleCompleteModal = false;
    setIsVisibleCompleteModal(bool) {
        this.isVisibleCompleteModal = bool;
    }

    // ✨ 알람 삭제
    deleteTask = async (id, setIsVisibleMenu) => {
        const loadedData = await AsyncStorage.getItem("alarm");
        const parseData = JSON.parse(loadedData);
        const copy = Object.assign({}, parseData);
        delete copy[id];
        this.storeData(copy);
        this.getAlarms(this.filtered);
        setIsVisibleMenu(false);
    };

    // ✨ 로컬에 저장하기
    storeData = async (alarms) => {
        try {
            await AsyncStorage.setItem("alarm", JSON.stringify(alarms));
            this.setAlarm(alarms);
            // confirmList(alarms); // 알람이 아예 없는지 검사
        } catch (error) {
            throw error;
        }
    };

    // ✨ 알람 불러오기
    getAlarms = async () => {
        try {
            const loadedData = await AsyncStorage.getItem("alarm");
            const parseData = JSON.parse(loadedData);
            const changedDay = this.day ? this.day : 7; //일요일을 0 👉 7 변환
            // true면 오늘의 요일만 ,  false면 전체요일
            const alarm = this.filtered
                ? Object.values(parseData)
                      .filter((alarm) => alarm.day.includes(changedDay))
                      .reduce((p, v) => ({ ...p, [v.id]: v }), {})
                : parseData;
            this.alarms = alarm || [];

            // 🥸 다른 함수에 전달할때도 this를 잊지말자!
            this.confirmList(this.alarms);
        } catch (error) {
            throw error;
        }
    };

    // ✨ 알람이 아예 없는지 검사
    confirmList = (alarms) => {
        Object.values(alarms).length === 0
            ? this.setIsVisibleAlarm(false)
            : this.setIsVisibleAlarm(true);
    };

    // ✨ 전체알람 < > 오늘알람
    handlePressAlarmFilter = () => {
        // true : 오늘의 알람만 노출
        // false : 모든 알람 노출
        this.setFiltered(!this.filtered);
    };

    // ✨복용완료
    toggleTask = (id) => {
        // 🪲 완료시 알람을 가져와서 변경해주는데 전체알람쪽이 사라진다.
        var copy = Object.assign({}, this.alarms);
        copy[id].completed = !copy[id].completed;
        this.storeData(copy); // 로컬에 저장하기
        this.allCompleted(); // 전체 복용했는지 확인
    };

    // ✨전체 체크 시 복용일을 1일 증가
    allCompleted = async () => {
        // 🪲 오늘의 알람만 눌러야 완료체크 되도록 해야함. 🪲
        let num = 0;
        for (let i = 0; i < Object.values(this.alarms).length; i++) {
            if (Object.values(this.alarms)[i].completed) {
                num++;
                if (num == Object.values(this.alarms).length) {
                    const loadedDate = await AsyncStorage.getItem("date");
                    const parseDate = JSON.parse(loadedDate);
                    const todayDate = `${this.year}-${this.month + 1}-${
                        this.date
                    }`; // "2021-10-25"
                    console.log(parseDate, todayDate);
                    if (parseDate !== todayDate) {
                        this.plusDate();
                        this.plusDateMAX();
                        this.completeAlarm();
                        await AsyncStorage.setItem(
                            "date",
                            JSON.stringify(todayDate)
                        );
                        return;
                    } else {
                        return;
                    }
                }
            }
        }
    };
    // ✨복용완료
    plusDate = () => {
        this.setCountTotal(this.countTotal + 1);
    };
    plusDateMAX = () => {
        if (this.count === 13) {
            this.setCount(0);
        } else {
            this.setCount(this.count + 1);
        }
    };
    // ✨복용완료
    completeAlarm = () => {
        this.setIsVisibleCompleteModal(true);
    };
}

export const alarmsStore = new AlarmsStore();
