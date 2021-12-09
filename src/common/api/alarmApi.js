import axios from "axios";
import { Alert } from "react-native";

const url = "https://gulp.jenyglee.com/";

// ✨ 알람생성
const addAlarm = async (alarm, token) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "alarm",
            data: alarm,
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

// ✨ 알람 가져오기
const getAlarm = async (token, day) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "alarms",
            params: {
                day: day,
            },
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

// ✨ 알람 단건 가져오기
const getAlarmObj = async (token, alarmId) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "alarms",
            params: {
                alarm_id: alarmId,
            },
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export { addAlarm, getAlarm, getAlarmObj };
