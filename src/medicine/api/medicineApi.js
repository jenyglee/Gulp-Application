import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const url = "https://gulp.jenyglee.com/";

// ✨약 생성
const addMedicine = async (medicine) => {
    try {
        const response = await axios({
            method: "POST",
            url: url + "medicine",
            data: medicine,
        });
        // const ID = Date.now();
        // const newMedicine = {
        //     [ID]: { id: ID, name: medicine.name, brand: medicine.brand.id },
        // };

        // await AsyncStorage.setItem("medicine", JSON.stringify({ ...Item, ...newMedicine }));
        return response.status;
        // if (response.status === 200) {
        //     console.log(response.data);
        //     // 서버 저장 완료 후, AsyncStorage(medicine)에 저장
        //     // const loadedData = await AsyncStorage.getItem("medicine");
        //     // const Item = JSON.parse(loadedData);
        //     // const ID = Date.now();
        //     // const newMedicine = {
        //     //     [ID]: { id: ID, name: medicine.name, brand: medicine.brand.id },
        //     // };

        //     // await AsyncStorage.setItem(
        //     //     "medicine",
        //     //     JSON.stringify({ ...Item, ...newMedicine })
        //     // );
        // } else if (response.status === 500) {
        //     // ❓👀 중복된 약이 있을땐 500이 뜨는데, 왜 알럿이 안뜨는 걸까?
        //     Alert.alert("500");
        // }
    } catch (error) {
        // 🍎
        // Alert.alert(JSON.stringify(error));
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
const getBrands = async (text) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "brand",
            params: {
                name: text,
            },
        });
        return response.data;
    } catch (error) {}
};

// ✨약 조회
const getMedicines = async ({ brandKey, text }) => {
    try {
        const response = await axios({
            method: "GET",
            url: url + "medicines",
            params: {
                brandId: brandKey,
                name: text,
            },
        });
        // console.log(response.data)
        return response.data;
    } catch (error) {}
};
// ✨약 삭제
// const deleteMedicine = async (token) => {
//     try {
//         const response = await axios({
//             method: "GET",
//             url: url + "medicines",
//             headers: { authorization: token },
//         });

//         if (response.status === 200) {
//             // ❓👀 등록된 약을 삭제해야 하는데, 어느 경로로 들어가야 할까?
//             console.log(response);
//         }
//     } catch (error) {}
// };

export { addMedicine, deleteMedicine, getBrands, getMedicines };
