import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const url = "https://gulp.jenyglee.com/";

// ✨약 생성
const apiAddMedicine = async (medicine, token) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "medicine",
            data: medicine,
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        Alert.alert(JSON.stringify(error));
    }
};

// ✨약 삭제
const deleteMedicine = async (token) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "medicines",
            headers: { authorization: token },
        });

        if (response.status === 200) {
            // ❓👀 등록된 약을 삭제해야 하는데, 어느 경로로 들어가야 할까?
            console.log(response);
        }
    } catch (error) {}
};

// ✨브랜드조회
const apiGetBrands = async (text, token) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "brand",
            params: {
                name: text,
            },
            headers: { authorization: token },
        });
        return response.data;
    } catch (error) {}
};

// ✨약 조회
const apiGetMedicines = async ({ categoryKey, brandKey, medicine }) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "medicines",
            params: {
                categoryId: categoryKey,
                brandId: brandKey,
                name: medicine,
            },
        });
        return response.data;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

// ✨카테고리 조회
const apiGetCategory = async (token) => {
    try {
        const response = axios({
            method: "GET",
            url: url + "category",
            headers: { authorization: token },
        });
        return response;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
};

export {
    apiAddMedicine,
    deleteMedicine,
    apiGetBrands,
    apiGetMedicines,
    apiGetCategory,
};
