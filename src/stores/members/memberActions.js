import { actionsMembers } from "./membersSlice";
import { Alert } from "react-native";
import { emailValidation, signup } from "@/member/api/memberApi";

const actions = {
    // ✨ 이메일/비밀번호 검토 및 로그인 진행(Signin)
    SigninButtonPress : (email, password, signin, isEmail, navigation) => async (dispatch) => {
        try {
            if (email !== "") {
                if (isEmail(email)) {
                    if (password !== "") {
                        await signin({ email, password });
                        navigation.navigate("AlarmList");
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
            Alert.alert(e.message);
        }
    },
    // ✨ 모두 동의 체크(Signup00)
    allCheck : (allAgree, list, setAllAgree, setList) => (dispatch) => {
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
    toggleList : (id, list, setAllAgree, setList) => (dispatch) => {
        const copy = [...list];
        copy[id].checked = !copy[id].checked;
        const result = copy.every((item) => {
            return item.checked;
        });
        setAllAgree([{ checked: result }]);
        setList(copy);
    },

    // ✨ 약관 상세보기(Signup00)
    toggleDetail : (id, list, setList) => (dispatch) => {
        const copy = [...list];
        copy[id].accordion = !copy[id].accordion;
        setList(copy);
    },

    // ✨ 회원가입(Signup01)
    handleSignupBtnPress : (nickname, email, password, navigation) => async (dispatch) => {
        // try {
        //     const response = await signup({ nickname, email, password });
        //     if (response === 200) {
        //         navigation.navigate("Signup02");
        //     } else {
        //         Alert.alert(response);
        //     }
        // } catch (error) {
        //     Alert.alert(error.message);
        // }
        navigation.navigate("Signup02");
    },
}

export default actions;
