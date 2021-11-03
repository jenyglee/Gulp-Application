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

    globalDate = new Date();
    year = this.globalDate.getFullYear();
    month = this.globalDate.getMonth();
    date = this.globalDate.getDate();
    day = this.globalDate.getDay();

    alarms = [];
    setAlarm(alarms) {
        this.alarms = alarms;
    }

    asdasdasd() {
        console.log("asjhsdh");
    }

    // 알람 유무
    isVisibleAlarm = true;
    setIsVisibleAlarm(bool) {
        this.isVisibleAlarm = bool;
    }

    // Today <-> All 필터링
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

    //전체복용 완료
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

    //  ✨ 알람 저장
    saveMedicine = async (
        medicineList,
        time,
        week,
        weekCheckList,
        navigation
    ) => {
        // 빈칸 검수
        const confirmed = this.ConfirmValue(medicineList, time, week);

        // 빈칸 검수가 완료된 경우 저장 진행
        if (confirmed) {
            const ID = Date.now();
            {
                // ⓵ 체크된 요일의 id만 가져와 빈 배열(weekCheckList)에 넣기
                week.map((checkedDay) => {
                    if (checkedDay.checked) {
                        weekCheckList.push(checkedDay.id);
                    }
                });
            }
            // ⓶ 채워진 배열을 변수화
            const newTask = {
                [ID]: {
                    id: ID,
                    time: time,
                    name: medicineList,
                    day: weekCheckList, // 숫자로 전달됨 ex) [2, 3]
                    completed: false,
                },
            };
            try {
                const value = await AsyncStorage.getItem("alarm");
                const alarm = JSON.parse(value);
                await AsyncStorage.setItem(
                    "alarm",
                    JSON.stringify({ ...alarm, ...newTask })
                );
                navigation.navigate("AlarmList");
            } catch (error) {
                Alert.alert(error);
            }
        } else if (!confirmed) {
            console.log(confirmed);
            Alert.alert("설정이 전부 입력되었는지 확인해주세요.");
        }
    };
    //  ✨빈칸검수
    ConfirmValue = (medicine, time, day) => {
        // ① 복용중인 영양제에 등록된 약이 있는지
        if (Object.values(medicine).length != 0) {
            // ② 시간을 설정했는지
            if (time !== "") {
                // ③ 체크된 요일이 하나라도 존재하는지
                const result = day.some((item) => {
                    return item.checked;
                });
                if (result) {
                    // ①②③ 모두 통과 시 true 반환
                    return true;
                } else return false;
            } else return false;
        } else return false;
    };
}

export const alarmsStore = new AlarmsStore();
