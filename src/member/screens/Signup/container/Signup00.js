import React, { useState, useContext } from "react";
import { Dimensions } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { icons14px } from "@/icons";
import { Button } from "@components/index";
import CheckList from "@/member/screens/Signup/component/CheckList";

const Wrap = styled.View`
    width: ${({ width }) => width - 48}px;
    height: 100%;
    align-self: center;
    align-items: center;
    padding-top: 20px;
`;

const AllAgreeBtn = styled.TouchableOpacity`
    width: 100%;
    margin-bottom: 20px;
`;

const AllAgreeBtnContainer = styled.View`
    background-color: ${({ theme, allAgree }) =>
        allAgree ? theme.allAgreeBackgroundChecked : theme.allAgreeBackground};
    height: 50px;
    border-radius: 12px;
    border: ${({ theme }) => `2px solid ${theme.allAgreeBackgroundStroke}`};
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const AllAgreeBtnImage = styled.Image`
    width: 14px;
    height: 14px;
    margin-right: 5px;
`;

const AllAgreeBtnTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: ${({ theme, allAgree }) =>
        allAgree ? theme.allAgreeTextChecked : theme.allAgreeText};
`;

const Signup00 = ({ navigation }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    const theme = useContext(ThemeContext);
    const [allAgree, setAllAgree] = useState(false);
    const [allValue, setAllValue] = useState(false);
    const listData = [
        {
            id: 0,
            name: "이용약관 동의 (필수)",
            detailText:
                "이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 이용약관 동의 세부내용 ",
            checked: false,
            accordion: true,
        },
        {
            id: 1,
            name: "개인정보 수집 및 이용 동의 (필수)",
            detailText: "개인정보 수집 및 이용 동의 세부내용",
            checked: false,
            accordion: false,
        },
    ];
    const [list, setList] = useState(listData);

    // ✨ 모두 동의 체크
    const allCheck = () => {
        setAllAgree(!allAgree);
        const copyList = [...list];
        {
            copyList.map((item) => {
                if (allAgree) {
                    item.checked = false;
                } else {
                    item.checked = true;
                }
            });
        }
        setList(copyList);
    };

    // ✨ 약관 체크 토글
    const toggleList = (id) => {
        const copy = [...list];
        copy[id].checked = !copy[id].checked;
        setList(copy);
    };

    // ✨ 약관 상세보기
    const toggleDetail = (id) => {
        const copy = [...list];
        copy[id].accordion = !copy[id].accordion;
        setList(copy);
    };

    return (
        <Wrap width={width} height={height}>
            <AllAgreeBtn
                onPress={() => {
                    allCheck();
                }}
            >
                <AllAgreeBtnContainer allAgree={allAgree}>
                    <AllAgreeBtnImage
                        source={
                            allAgree
                                ? icons14px.checkWhite
                                : icons14px.checkMain
                        }
                        resizeMode="contain"
                    />
                    <AllAgreeBtnTitle allAgree={allAgree}>
                        약관에 모두 동의
                    </AllAgreeBtnTitle>
                </AllAgreeBtnContainer>
            </AllAgreeBtn>
            {list.map((item) => {
                return (
                    <CheckList
                        key={item.id}
                        item={item}
                        toggleList={toggleList}
                        toggleDetail={toggleDetail}
                    />
                );
            })}
            <Button
                title="다음"
                onPress={() => {
                    navigation.navigate("Signup01");
                }}
                btnWrapStyle={{
                    width: width - 48,
                    position: "absolute",
                    bottom: 40,
                }}
                containerStyle={{
                    backgroundColor: allValue
                        ? theme.btnBackground
                        : theme.textDisable,
                }}
            />
        </Wrap>
    );
};

export default Signup00;
