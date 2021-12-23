import React from "react";
import { TextButton } from "@/common/components";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";

const Container = styled.View`
    width: 100%;
    max-height: 130px;
    border-radius: 12px;
    padding: 0 15px;
    margin-top: 5px;
    border: ${({ theme }) => `1px solid ${theme.inputPlaceholderFocus}`};
`;

const StyledText = styled.Text`
    color: #000;
    padding: 8px 0;
`;

const BrandsDropList = ({ filtered, onSelectItem, setIsFocusedBrand }) => {
    return (
        <Container>
            <ScrollView>
                {filtered.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                onSelectItem(item.id);
                                setIsFocusedBrand(false);
                            }}
                            key={index}
                        >
                            <StyledText>{item.name}</StyledText>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    onPress={() => {
                        setIsFocusedBrand(false);
                    }}
                >
                    <StyledText>기타</StyledText>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    );
};

export default BrandsDropList;
