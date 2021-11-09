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
    // allCheckWeek = [{ id: 0, day: "All", checked: false }];
    // checkWeek = [
    //     { id: 1, day: "월", checked: false },
    //     { id: 2, day: "화", checked: false },
    //     { id: 3, day: "수", checked: false },
    //     { id: 4, day: "목", checked: false },
    //     { id: 5, day: "금", checked: false },
    //     { id: 6, day: "토", checked: false },
    //     { id: 7, day: "일", checked: false },
    // ];

    // weekAll = [{ id: 0, day: "All", checked: false }];
    // setWeekAll(arr) {
    //     this.weekAll = arr;
    // }

    // week = [
    //     { id: 1, day: "월", checked: false },
    //     { id: 2, day: "화", checked: false },
    //     { id: 3, day: "수", checked: false },
    //     { id: 4, day: "목", checked: false },
    //     { id: 5, day: "금", checked: false },
    //     { id: 6, day: "토", checked: false },
    //     { id: 7, day: "일", checked: false },
    // ];
    // setWeek(arr) {
    //     this.week = arr;
    // }

    // time = "";
    // setTime(date) {
    //     this.time = date;
    // }

    // // ✨요일 전채선택(common)
    // allWeekCheck = () => {
    //     const copyAllWeek = [...this.weekAll];
    //     const copyWeek = [...this.week];
    //     copyAllWeek[0].checked = !copyAllWeek[0].checked;
    //     {
    //         copyWeek.map((item) => {
    //             if (copyAllWeek[0].checked) {
    //                 item.checked = true;
    //             } else {
    //                 item.checked = false;
    //             }
    //         });
    //     }
    //     this.setWeek(copyWeek);
    //     this.setWeekAll(copyAllWeek);
    // };

    // // ✨요일 개별선택
    // weekCheck = (id) => {
    //     var copy = [...this.week]; //week : 월화수목금토일
    //     copy[id - 1].checked = !copy[id - 1].checked;

    //     // 체크 하나라도 빠지면 false
    //     const result = copy.every((item) => {
    //         return item.checked;
    //     });
    //     this.setWeekAll([{ id: 0, day: "All", checked: result }]);
    //     this.setWeek(copy);
    // };

    // // ✨ 설정한 시간 가져오기
    // whatTime = (date) => {
    //     this.setTime(date);
    // };
}

export const commonStore = new CommonStore();
