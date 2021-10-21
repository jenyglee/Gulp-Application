import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { Alert } from "react-native";
const url = "https://gulp.jenyglee.com/";

// ✨로그인
const signin = async (member) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "signin",
            data: member,
        });

        if (response.data.statusCodeValue !== 200) {
            throw new Error(response.data.body.message);
        }
        console.log(response.headers.authorization);
        await AsyncStorage.setItem("token", response.headers.authorization);
    } catch (error) {
        throw error;
    }
};

// ✨로그아웃
const logout = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios({
            method: "POST",
            url: url + "logout",
            headers: { authorization: token },
        });
        if (response.status === 200) {
            // console.log(response.status);
            await AsyncStorage.removeItem("token");
        }
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

// ✨회원탈퇴
const removeUser = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);

    // const response = await axios({
    //     method : "DELETE",
    //     url: url +
    // })
};

const emailValidation = async (email) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "emailValidation",
            data: email,
        });
        if (response.status === 200) {
            console.log(response.status);
            Alert.alert("사용할 수 있는 이메일입니다.");
        }
    } catch (error) {
        throw error;
    }
};

export { signin, logout, signup, removeUser, emailValidation };
