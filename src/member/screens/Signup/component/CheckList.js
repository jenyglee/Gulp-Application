import React from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import { icons14px } from "@/icons";

const List = styled.View`
    width: 100%;
    margin-bottom: 12px;
`;
const CheckListContainer = styled.View`
    width: 100%;
    padding: 10px 20px;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.white};
`;
const CheckBtnWrap = styled.TouchableWithoutFeedback``;
const CheckListTitleWrap = styled.View`
    flex-direction: row;
    align-items: center;
`;
const CheckImageBackground = styled.View`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, checked }) =>
        checked ? theme.smallBtnBackgroundChecked : theme.smallBtnBackground};
    margin-right: 5px;
`;
const CheckImage = styled.Image`
    width: 14px;
    height: 14px;
`;
const ListTitle = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.textBasic};
`;
const CheckListDetailBtnWrap = styled.TouchableWithoutFeedback``;
const DetailBtnImage = styled.Image`
    width: 14px;
    height: 14px;
`;

const Accordion = styled.ScrollView`
    width: 100%;
    height: 200px;
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
    margin-top: 10px;
`;

const DetailText = styled.Text`
    padding-top: 16px;
    color: ${({ theme }) => theme.textSub};
`;

const CheckList = ({ item, toggleList, toggleDetail }) => {
    const _toggleList = () => {
        toggleList(item.id);
    };
    const _toggleDetail = () => {
        toggleDetail(item.id);
    };
    console.log(item.checked);
    return (
        <List>
            <CheckListContainer>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <CheckBtnWrap onPress={_toggleList}>
                        <CheckListTitleWrap>
                            <CheckImageBackground checked={item.checked}>
                                <CheckImage
                                    source={
                                        item.checked
                                            ? icons14px.checkWhite
                                            : icons14px.checkLightGrey
                                    }
                                />
                            </CheckImageBackground>
                            <ListTitle>{item.name}</ListTitle>
                        </CheckListTitleWrap>
                    </CheckBtnWrap>

                    <CheckListDetailBtnWrap onPress={_toggleDetail}>
                        <DetailBtnImage
                            source={
                                item.accordion
                                    ? icons14px.arrowTop
                                    : icons14px.arrowBottom
                            }
                        />
                    </CheckListDetailBtnWrap>
                </View>
                {item.accordion ? (
                    <>
                        <Line />
                        <Accordion>
                            <DetailText>{item.detailText}</DetailText>
                        </Accordion>
                    </>
                ) : null}
            </CheckListContainer>
        </List>
    );
};

export default CheckList;
