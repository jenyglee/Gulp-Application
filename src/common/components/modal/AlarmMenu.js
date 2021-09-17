import React from "react";
import { Modal, Dimensions } from "react-native";
import styled from "styled-components";

const OpacityBackground = styled.View`
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: absolute;
`;

const Wrap = styled.View`
    position: relative;
    /* top: ${({ height }) => height / 10000}px; */
    top: 0;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    width: ${({ width }) => width - 48}px;
    height: 150px;
    padding: 0 20px;
    border-radius: 12px;
    align-items: center;
`;

const ListBtn = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`;
const ListContainer = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const ListText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.black};
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
`;

const AlarmMenu = ({ showAlarmMenu, deleteTask, editMedicine }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <OpacityBackground />
            <Wrap height={height}>
                <ModalContainer width={width}>
                    <ListBtn onPress={editMedicine}>
                        <ListContainer>
                            <ListText>알람 변경</ListText>
                        </ListContainer>
                    </ListBtn>
                    <Line />
                    <ListBtn onPress={deleteTask}>
                        <ListContainer>
                            <ListText>지우기</ListText>
                        </ListContainer>
                    </ListBtn>
                    <Line />
                    <ListBtn onPress={showAlarmMenu}>
                        <ListContainer
                            style={{
                                borderBottomWidth: 0,
                            }}
                        >
                            <ListText>닫기</ListText>
                        </ListContainer>
                    </ListBtn>

                    {/* ✨ 버튼 개수만큼 반복문 돌려서 운영요소 만들려고 했음 */}
                    {/* 🪲 버튼의 각각 다른 기능은 어떻게 차별시킨 건지 의문 */}
                    {
                        // alarmMenuList.map((i, a) => {
                        //     return (
                        //             <>
                        //                 <ListBtn>
                        //                     <ListContainer>
                        //                         <ListText>{i.title}</ListText>
                        //                     </ListContainer>
                        //                 </ListBtn>
                        //                 /* 마지막 버튼 아래 라인 지우기*/
                        //                 {a == 2 ? null : <Line />}
                        //             </>
                        //     );
                        // })
                    }
                </ModalContainer>
            </Wrap>
        </Modal>
    );
};

export default AlarmMenu;
