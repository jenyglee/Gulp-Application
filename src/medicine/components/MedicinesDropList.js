import React from "react";
import { TextButton } from "@/common/components";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components";
import { illust } from "@/images";

const Container = styled.View`
    width: 100%;
    max-height: 170px;
    border-radius: 12px;
    padding: 0 15px;
    margin-top: 5px;
    border: ${({ theme }) => `1px solid ${theme.inputPlaceholderFocus}`};
`;

const StyledText = styled.Text`
    color: #000;
    padding: 8px 0;
`;

const NotFoundContainer = styled.View`
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledImage = styled.Image`
    width: 60px;
    height: 54px;
    margin-top: 20px;
    margin-bottom: 20px;
`;
const NotFoundText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.textDisable};
`;

const MedicinesDropList = ({
    filtered,
    onSelectItem,
    setIsFocusedMedicine,
    medicine,
    navigation,
}) => {
    return (
        <Container>
            <ScrollView>
                {filtered[0] !== undefined ? (
                    <>
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
                        <TextButton
                            title="+ 직접 등록하기"
                            btnStyle={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                            textStyle={{
                                fontWeight: "400",
                            }}
                            onPress={() => {
                                navigation.navigate("AddMedicine", {
                                    medicine,
                                });
                            }}
                        />
                    </>
                ) : (
                    <>
                        <NotFoundContainer>
                            <StyledImage
                                source={illust.error}
                                resizeMode="containe"
                            />
                            <NotFoundText>
                                등록되어있는 약이 없어요...
                            </NotFoundText>
                        </NotFoundContainer>
                        <TextButton
                            title="+ 직접 등록하기"
                            btnStyle={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}
                            textStyle={{
                                fontWeight: "400",
                            }}
                            onPress={() => {
                                navigation.navigate("AddMedicine", {
                                    medicine,
                                });
                            }}
                        />
                    </>
                )}
            </ScrollView>
        </Container>
    );
};

export default MedicinesDropList;
