import { actionsCommon } from "./commonSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // // ✨요일 전채선택(common)
    // allWeekCheck:
    //     ({ week, setWeek, weekAll, setWeekAll }) =>
    //     (dispatch) => {
    //         const copyWeekAll = [...weekAll];
    //         const copyWeek = [...week];
    //         copyWeekAll[0].checked = !copyWeekAll[0].checked;
    //         {
    //             copyWeek.map((item) => {
    //                 if (weekAll[0].checked) {
    //                     item.checked = true;
    //                 } else {
    //                     item.checked = false;
    //                 }
    //             });
    //         }
    //         setWeekAll(copyWeekAll);
    //         setWeek(copyWeek);
    //     },
    // // ✨요일 개별선택
    // weekCheck:
    //     ({ id, week, setWeek, weekAll, setWeekAll }) =>
    //     (dispatch) => {
    //         const copy = [...week];
    //         copy[id - 1].checked = !copy[id - 1].checked;
    //         // 체크 하나라도 빠지면 false
    //         const result = copy.every((item) => {
    //             return item.checked;
    //         });
    //         setWeekAll([{ id: 0, day: "All", checked: result }]);
    //     },
};

export default actions;
