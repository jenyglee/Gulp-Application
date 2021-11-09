import { actionsMembers } from "./membersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

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
}

export default actions;
