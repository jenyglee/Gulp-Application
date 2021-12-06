import axios from "axios";
import { Alert } from "react-native";

const url = "https://gulp.jenyglee.com/";

// ✨ 알람생성
const addAlarm = async (alarm) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "alarm",
            data: alarm,
        });
        return response.status;
    } catch (error) {
        console.log(error);
    }
};

// ✨ 알람 가져오기(진행중)
const getAlarm = async (alarm) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "alarms",
            headers: { authorization: token },
        });
        return response.status;
    } catch (error) {
        console.log(error);
    }
};

export { addAlarm, getAlarm };
