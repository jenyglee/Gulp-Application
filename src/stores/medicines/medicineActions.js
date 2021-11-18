import { actionsMedicines } from "./medicinesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const actions = {
    // ✨ 약 삭제(medicineStore)
    deleteMedicine : (id, medicineList) => async (dispatch)=>{
        try {
            const medicines = await (actions.deleteTask(id, medicineList))(dispatch)
            await (actions.storeData(medicines))(dispatch)
        } catch (error) {
            Alert.alert(error)
        }
    },

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

    // ✨ 카테고리 선택
    handleSelectCategory : (categoryData, id) => (dispatch) => {
        categoryData.map((item) => {
            if (item.id === id) {
                dispatch(actionsMedicines.setCategory(item))
                return;
            } else return;
        });
    },

    // ✨ brand 검색창에 입력
    onSearchBrand : (text, debounceSearchBrand) => (dispatch) => {
        // setBrand(text);
        dispatch(actionsMedicines.setBrand(text))
        debounceSearchBrand(text)
    },

    // ✨ medicine 검색창에 입력
    onSearchMedicine : (text, debounceSearchMedicine) => (dispatch) => {
        dispatch(actionsMedicines.setMedicine(text))
        // setMedicine(text);
        debounceSearchMedicine(text);
    },

 // ✨ 항목에 있는 브랜드를 인풋에 입력
    handleSelectBrand : (id, filtered, setIsSearchingBrand, setFiltered) => (dispatch) => {
        filtered.map((item) => {
            if (item.id === id) {
                dispatch(actionsMedicines.setBrand(item.name))
                dispatch(actionsMedicines.setBrandKey(item.id))
                setIsSearchingBrand(false)
                setFiltered([])
            } else return;
        });
    },

    // ✨ 항목에 있는 약을 인풋에 입력
    handleSelectMedicine : (id, filtered, setIsSearchingMedicine) => (dispatch) => {
        filtered.map((item) => {
            if (item.medicineId === id) {
                dispatch(actionsMedicines.setMedicine(item.name))
                setIsSearchingMedicine(false)
            } else return;
        });
    },

    setMedicine : (payload) => (dispatch) => {
        dispatch(actionsMedicines.setMedicine(payload))
    }
}

export default actions;
