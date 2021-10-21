import React, { useState } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@components/index";
import { SerchDropList } from "@/medicine/components/index";
import { Alert } from "react-native";

const Container = styled.View`
    width: 100%;
    height: 100%;
`;
// "name":"오메가 3", "imgPath":"test", "brand":"정동제", "category":"오메가"}
const AddMedicine = ({ navigation }) => {
    const tempData = [
        { id: 0, name: "플래티넘 메가비타민c 3000", brand: "렛츠미" },
        { id: 1, name: "고려은단 메가도스C 3000 3g", brand: "고려은단" },
        { id: 2, name: "비타민C 골드플러스 파워업", brand: "고려은단" },
        { id: 3, name: "비타민C 1000", brand: "고려은단" },
        { id: 4, name: "비타민C 1000mg", brand: "종근당" },
    ];
    const [filtered, setFiltered] = useState(tempData);
    const [value, setValue] = useState("");
    const [searching, setSearching] = useState(false);

    // ✨ 로컬에 저장하기
    const getMedicineData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem("medicine");
            const Item = JSON.parse(loadedData);

            // ✨ value 값이 medicine 스토레이지에 있는지 확인
            let duplicate = Object.values(Item).some((v) => {
                v.name === value;
            });

            if (duplicate) {
                Alert.alert("이 약은 이미 등록되어 있습니다.");
                return;
            }

            const ID = Date.now();
            const newMedicine = {
                [ID]: { id: ID, name: value, completed: false },
            };

            await AsyncStorage.setItem(
                "medicine",
                JSON.stringify({ ...Item, ...newMedicine })
            );

            navigation.navigate("AddAlarm");
        } catch (e) {
            console.log(e);
        }
    };

    const onSearch = (text) => {
        if (text) {
            setSearching(true);
            const filteredMedicine = tempData.filter((item) => {
                if (item.name.match(text)) {
                    return item.name;
                }
            });
            setFiltered(filteredMedicine);
        } else {
            setSearching(false);
        }
        setValue(text);
    };

    // ✨ 항목에 있는 약을 인풋에 입력
    const selectItem = (id) => {
        // console.log(id);
        filtered.map((item) => {
            if (item.id === id) {
                setValue(item.name);
                return;
            } else return;
        });
    };

    return (
        <Container>
            <Input
                value={value}
                onBlur={() => {}}
                onChangeText={(text) => onSearch(text)}
            />

            {searching && (
                <SerchDropList filtered={filtered} onPress={selectItem} />
            )}
            <Button title="저장" onPress={getMedicineData} />
        </Container>
    );
};

export default AddMedicine;
