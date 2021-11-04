import { actionsMedicines } from "./medicinesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨로컬에서 약 가져오기
    getMedicine : () =>  async (dispatch) => {
        try {
            const loadedData = await AsyncStorage.getItem("medicine");
            dispatch(actionsMedicines.setMedicineList((JSON.parse(loadedData))))
        } catch (error) {
            throw error;
        }
    },

    // ✨ 약 삭제(medicineStore)
    deleteTask : (id, medicineList) => async (dispatch) => {
        const copy = Object.assign({}, medicineList);
        delete copy[id];
        dispatch(actionsMedicines.setMedicineList(copy))
        return copy
    },

    // ✨ 약을 삭제하고 나면 "medicine"로컬에 다시 저장(medicineStore)
    storeData : (item) => async (dispatch) => {
        try {
            await AsyncStorage.setItem("medicine", JSON.stringify(item));
        } catch (error) {
            throw error;
        }
    },
}

export default actions;
