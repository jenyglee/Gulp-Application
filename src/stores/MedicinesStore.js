import AsyncStorage from "@react-native-async-storage/async-storage";
import { configure, makeAutoObservable } from "mobx";

configure({
    // 컴포넌트에서 값을 수정해도 경고를 뜨지 않게 해줌.
    enforceActions: "never",
    // useProxies: 'never'
});

export default class MedicinesStore {
    constructor() {
        makeAutoObservable(this);
    }

    // medicineList = {};
    // setMedicineList(obj) {
    //     this.medicineList = obj;
    // }

    // ✨ 약 삭제(medicineStore)
    // deleteTask = async (id) => {
    //     const copy = Object.assign({}, this.medicineList);
    //     delete copy[id];
    //     try {
    //         // await storeData(copy, "medicine");
    //         this.storeData(copy);
    //         this.setMedicineList(copy);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // ✨ 약을 삭제하고 나면 "medicine"로컬에 다시 저장(medicineStore)
    // storeData = async (item) => {
    //     try {
    //         await AsyncStorage.setItem("medicine", JSON.stringify(item));
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // ✨로컬에서 약 가져오기
    // getMedicine = async () => {
    //     try {
    //         // const alarm = await AsyncStorage.getItem("alarm");
    //         const loadedData = await AsyncStorage.getItem("medicine");
    //         this.setMedicineList(JSON.parse(loadedData));
    //     } catch (error) {
    //         throw error;
    //     }
    // };
}

export const medicinesStore = new MedicinesStore();
