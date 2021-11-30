import React from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    min-height: 35px;
    border-radius: 12px;
    padding: 0 15px;
    margin-top: 5px;
    border: ${({ theme }) => `1px solid ${theme.inputPlaceholderFocus}`};
`;

const StyledText = styled.Text`
    color: #000;
    padding: 8px 0;
`;

const MedicinesDropList = ({
    filtered,
    onSelectItem,
    setIsFocusedMedicine,
}) => {
    return (
        <Container>
            <ScrollView>
                {filtered.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onSelectItem(item.medicineId);
                                setIsFocusedMedicine(false);
                                // onSelectItem.bind(undefined, item.id);
                            }}
                            key={index}
                        >
                            <StyledText>{item.name}</StyledText>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Container>
    );
};

export default MedicinesDropList;
