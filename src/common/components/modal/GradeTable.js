import React, { useState, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import { Modal, Dimensions } from "react-native";
import Button from "./Button";
import Swiper from "../Swiper";
// import { showGradeTable } from "@/common/helper/helper";

const OpacityBackground = styled.View`
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: absolute;
`;

const Wrap = styled.View`
    position: relative;
    top: 200px;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    width: ${({ width }) => width - 48}px;
    height: 350px;
    /* padding: 30px; */
    border-radius: 12px;
    align-items: center;
`;

const SwipeWrap = styled.View`
    width: 100%;
    height: 100%;
`;

const GradeTable = ({ onPress }) => {
    const width = Dimensions.get("window").width;

    const refModal = useRef(null);
    const [modalStyle, setModalStyle] = useState({});

    // ✨ 너비값을 높이로 넣는 과정(진행중)
    useLayoutEffect(() => {
        setModalStyle({ height: 350 });
        // setModalStyle({ height: refModal.current.clientWidth });
        // console.log(refModal.current.clientWidth);
    }, []);

    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <OpacityBackground />
            <Wrap>
                <ModalContainer width={width} ref={refModal} style={modalStyle}>
                    <SwipeWrap>
                        <Swiper />
                    </SwipeWrap>

                    <Button title="닫기" onPress={onPress} />
                </ModalContainer>
            </Wrap>
        </Modal>
    );
};

export default GradeTable;
