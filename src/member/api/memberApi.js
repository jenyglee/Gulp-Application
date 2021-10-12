import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
const url = "https://gulp.jenyglee.com/";

// ✨로그인
const signin = async (member) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "signin",
            data: member,
        });

        console.log(response.config.data["email"]);

        if (response.data.statusCodeValue !== 200) {
            throw new Error(response.data.body.message);
        }
        // console.log(jwt_decode(response.headers.authorization));
        await AsyncStorage.setItem("token", response.headers.authorization);
    } catch (error) {
        throw error;
    }
};

// ✨로그아웃
const signout = async () => {
    try {
        await AsyncStorage.removeItem("token");
        // const token = await AsyncStorage.getItem("token");
        // // console.log(token);
        // const response = await axios({
        //     method: "POST",
        //     url: url + "logout",
        //     headers: { authoriztion: token }, // 인증용도?
        // });
        // if (response.status === 200) {
        //     await AsyncStorage.removeItem("token");
        // }
    } catch (error) {
        // throw error;
        console.log(error);
    }
};

// ✨회원가입
const signup = async (member) => {
    console.log(member);
    try {
        const response = await axios({
            method: "POST",
            url: url + "signup",
            data: member,
        });
        console.log(response);

        // if (response.data?.statusCodeValue !== 200) {
        //     throw new Error(response.data.body.message);
        // }
    } catch (error) {
        throw error;
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

export { signin, signout, signup };
