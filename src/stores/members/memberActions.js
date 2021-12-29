import { actionsMembers } from "./membersSlice";
import { Alert } from "react-native";
import jwt_decode from "jwt-decode";
import { apiSignup } from "@/member/api/memberApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨ 이메일/비밀번호 검토 및 로그인 진행(Signin)
    signin:
        (email, password, apiSignin, isEmail, navigation) =>
        async (dispatch) => {
            try {
                if (email !== "") {
                    if (isEmail(email)) {
                        if (password !== "") {
                            const response = await apiSignin({
                                email,
                                password,
                            });
                            if (response.data.statusCodeValue === 200) {
                                const token = response.headers.authorization;
                                await AsyncStorage.setItem("token", token);
                                const user = jwt_decode(token);
                                dispatch(
                                    actionsMembers.setNickname(user.nickname)
                                );
                                navigation.navigate("AlarmList");
                            } else if (response.data.statusCodeValue !== 200) {
                                Alert.alert(
                                    "아이디 또는 비밀번호를 다시 확인해주세요."
                                );
                            }
                        } else {
                            Alert.alert("비밀번호를 입력해주세요.");
                            return;
                        }
                    } else {
                        Alert.alert("이메일을 올바르게 입력해주세요.");
                        return;
                    }
                } else {
                    Alert.alert("이메일을 입력해주세요.");
                    return;
                }
            } catch (e) {
                console.log(JSON.stringify(e.message));
            }
        },

    // ✨ 모두 동의 체크(Signup00)
    allCheck: (allAgree, list, setAllAgree, setList) => (dispatch) => {
        const copyAllAgree = [...allAgree];
        const copyList = [...list];
        copyAllAgree[0].checked = !copyAllAgree[0].checked;
        {
            copyList.map((item) => {
                if (copyAllAgree[0].checked) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
        }
        setAllAgree(copyAllAgree);
        setList(copyList);
    },

    // ✨ 약관 체크 토글(Signup00)
    toggleAgreeItem: (id, list, setAllAgree, setList) => (dispatch) => {
        const copy = [...list];
        copy[id].checked = !copy[id].checked;
        const result = copy.every((item) => {
            return item.checked;
        });
        setAllAgree([{ checked: result }]);
        setList(copy);
    },

    // ✨ 약관 상세보기(Signup00)
    toggleDetail: (id, list, setList) => (dispatch) => {
        const copy = [...list];
        copy[id].accordion = !copy[id].accordion;
        setList(copy);
    },

    // ✨ 회원가입(Signup01)
    signup: (nickname, email, password, navigation) => async (dispatch) => {
        try {
            const response = await apiSignup({ nickname, email, password });
            if (response === 200) {
                navigation.navigate("Signup02");
            } else {
                Alert.alert(
                    "에러가 발생했습니다. 잠시 후에 다시 시도해주세요."
                );
            }
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    },

    // ✨ 유저정보 가져오기
    getUser: () => async (dispatch) => {
        const token = await AsyncStorage.getItem("token");
        dispatch(actionsMembers.setToken(token));
    },

    setNickname: (nickname) => (dispatch) => {
        dispatch(actionsMembers.setNickname(nickname));
    },
};

export default actions;
