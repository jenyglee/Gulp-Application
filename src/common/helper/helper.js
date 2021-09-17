import AsyncStorage from "@react-native-async-storage/async-storage";

// ✨ 로컬에 저장하기
const storeData = async (data, name) => {
    try {
        await AsyncStorage.setItem(name, JSON.stringify(data));
    } catch (error) {
        throw error;
    }
};

// ✨로컬에서 가져오기
const getData = async (name) => {
    try {
        const loadedData = await AsyncStorage.getItem(name);
        return JSON.parse(loadedData);
    } catch (error) {
        throw error;
    }
};

export { storeData, getData };
