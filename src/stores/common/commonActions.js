import { actionsCommon } from "./commonSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨ 설정한 시간 가져오기
    whatTime : (date) => (dispatch) => {
        dispatch(actionsCommon.setTime(date))
    },

    // ✨요일 전채선택(common)
    allWeekCheck : ({week, weekAll}) => (dispatch) => {
        let copyAllWeek = [...weekAll];
        let copyWeek = [...week];
        copyAllWeek[0].checked = !copyAllWeek[0].checked;
        {
            copyWeek.map((item) => {
                if (copyAllWeek[0].checked) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
        }
        dispatch(actionsCommon.setWeekAll(copyAllWeek))
        dispatch(actionsCommon.setWeek(copyWeek))
    },

    // ✨요일 개별선택
    weekCheck : ({id, week}) => (dispatch) => {
        let copy = [...week]; //week : 월화수목금토일
        copy[id - 1].checked = !copy[id - 1].checked;

        // 체크 하나라도 빠지면 false
        const result = copy.every((item) => {
            return item.checked;
        });
        dispatch(actionsCommon.setWeekAll([{ id: 0, day: "All", checked: result }]))
        dispatch(actionsCommon.setWeek(copy))
    },

}

export default actions;


