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

        if (response.data.statusCodeValue === 200) {
            // console.log(response.headers.authorization);
            console.log(response);
            await AsyncStorage.setItem("token", response.headers.authorization);
        } else if (response.data.statusCodeValue !== 200) {
            throw new Error(response.data.body.message);
        }
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
            Alert.alert("로그아웃이 정상적으로 완료되었습니다.");
            await AsyncStorage.removeItem("token");
        } else if( response.status !== 200){
            throw new Error(response.data.body.message);
        }
    } catch (error) {
        throw error;
    }
};

// ✨회원가입
const signup = async (member) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "signup",
            data: member,
        });
        return response.status;

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
    // console.log(token);

    const response = await axios({
        method: "DELETE",
        url: url + "member",
        headers: { authorization: token },
    });
    console.log(response);
    if (response.status === 200) {
        Alert.alert("회원탈퇴가 정상적으로 완료되었습니다.");
        AsyncStorage.setItem("token", "");
    }
};

// ✨ 이메일 중복확인
const emailValidation = async (email) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "email-validation",
            Param: email,
        });
        console.log(response) 

        // if (response.status === 200) {
        //     Alert.alert("사용할 수 있는 이메일입니다.");
        // }
    } catch (error) {
        throw error;
    }
};

// ✨회원정보 변경
const updateUser = async ({ token, nickname, password }) => {
    try {
        const response = await axios({
            method: "PUT",
            url: url + "member",
            headers : {authorization : token},
            data: {nickname, password}
        });
        console.log(response);
    } catch (error) {}
};
export { signin, logout, signup, removeUser, emailValidation, updateUser };
