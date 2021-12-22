import axios from "axios";
import { Alert } from "react-native";

const url = "https://gulp.jenyglee.com/";

// ✨ 알람생성
const apiAddAlarm = async (alarm, token) => {
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

// ✨ 알람변경
const apiEditAlarm = async (alarm, token) => {
    try {
        const response = await axios({
            method: "PUT",
            url: url + "alarm",
            data: { alarm },
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

// ✨ 오늘의 알람 가져오기
const apiGetAlarm = async (token, day) => {
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

// ✨ 모든 알람 가져오기
const apiGetAllAlarm = async (token) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "alarms",
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

// ✨ 알람 단건 가져오기
const apiGetOneAlarm = async (token, alarmId) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + `alarms/${alarmId}`,
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export {
    apiAddAlarm,
    apiEditAlarm,
    apiGetAlarm,
    apiGetAllAlarm,
    apiGetOneAlarm,
};
