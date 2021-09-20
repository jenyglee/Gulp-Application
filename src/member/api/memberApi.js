import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = "http://jpark93.iptime.org:39931/";
const login = async (member) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "login",
            data: member,
        });
        console.log(response.data.token);
        await AsyncStorage.setItem("token", response.data.token);
    } catch (error) {
        throw error;
    }
};
const signout = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios({
            method: "POST",
            url: url + "signout",
            data: { token },
            // headers: { token }, // 인증용도?
        });
        console.log(response);
        if (response.status === 200) {
            await AsyncStorage.removeItem("token");
        }
    } catch (error) {
        // throw error;
        console.log(error);
    }
};

const confirm = async (member) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios({
            method: "POST",
            url: "http://192.168.0.21:signout",
            data: member,
            headers: { token }, // 인증용도?
        });
        if (response.status === 200) {
            return response.data.alarmList;
        }
        console.log(response);
    } catch (error) {
        throw error;
    }
};

export { login, signout };
