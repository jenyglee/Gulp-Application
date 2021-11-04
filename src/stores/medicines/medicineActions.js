import { actionsMedicines } from "./medicinesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const actions = {
    // ✨로컬에서 약 가져오기
    getMedicine : () =>  async (dispatch) => {
        try {
            // const alarm = await AsyncStorage.getItem("alarm");
            const loadedData = await AsyncStorage.getItem("medicine");
            dispatch(actionsMedicines.setMedicineList((JSON.parse(loadedData))))
            // this.setMedicineList(JSON.parse(loadedData));
        } catch (error) {
            throw error;
        }
    },

    // ✨ 약 삭제(medicineStore)
    deleteTask : (id, medicineList) => async (dispatch) => {
        console.log(id, medicineList)
        // const copy = Object.assign({}, this.medicineList);
        // delete copy[id];
        // try {
        //     // await storeData(copy, "medicine");
        //     this.storeData(copy);
        //     this.setMedicineList(copy);
        // } catch (error) {
        //     console.log(error);
        // }
    },
}

export default actions;
