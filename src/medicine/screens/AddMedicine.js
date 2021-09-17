import React, { useState } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "@components/index";
import { AutoList } from "@/medicine/components/index";
import { BasicModal } from "@components/modal/index";

const Container = styled.View`
    width: 100%;
    height: 100%;
`;

const AddMedicine = ({ navigation }) => {
    const tempData = {
        1: { id: 1, name: "비타민c" },
        2: { id: 2, name: "철분" },
        3: { id: 3, name: "오메가3" },
        4: { id: 4, name: "아르기닌" },
        5: { id: 5, name: "고려은단" },
    };

    const [tasks, setTasks] = useState(tempData);
    const [value, setValue] = useState("");
    const [errorModal, setErrorModal] = useState(false);

    // ✨ 항목에 있는 약을 인풋에 입력
    const selectItem = (id) => {
        // console.log(tasks[id].name);
        setValue(tasks[id].name);
    };

    // ✨ 로컬에 저장하기
    const getMedicineData = async () => {
        try {
            const loadedData = await AsyncStorage.getItem("medicine");
            const Item = JSON.parse(loadedData);

            // ✨ value 값이 medicine 스토레이지에 있는지 확인
            let duplicate = Object.values(Item).some((v) => v.name === value);

            if (duplicate) {
                setErrorModal(true);
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

    //  ✨ 에러모달 닫기
    const closeModal = () => {
        setErrorModal(false);
    };

    return (
        <Container>
            <Input
                value={value}
                onChangeText={(text) => {
                    setValue(text);
                }}
            />
            {Object.values(tasks).map((item) => {
                return (
                    <AutoList
                        item={item}
                        key={item.id}
                        selectItem={selectItem}
                    />
                );
            })}
            <Button title="저장" onPress={getMedicineData} />
            {errorModal ? (
                <BasicModal
                    title="이 약은 이미 등록되어 있습니다."
                    onPress={closeModal}
                />
            ) : null}
        </Container>
    );
};

export default AddMedicine;
