import React from "react";
import styled from "styled-components";
import { Modal, Dimensions } from "react-native";
import Button from "./Button";

const OpacityBackground = styled.View`
    flex: 1;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.5;
    position: absolute;
`;

const Wrap = styled.View`
    position: relative;
    /* top: ${({ height }) => height}px; */
    top: 0;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.View`
    background-color: ${({ theme }) => theme.white};
    width: ${({ width }) => width - 48}px;
    height: auto;
    border-radius: 12px;
    align-items: center;
`;

const ContentContainer = styled.View`
    padding-top: 47px;
    padding-bottom: 97px;
    width: 100%;
    align-items: center;
`;

const StyledImage = styled.Image`
    width: 60px;
    height: 55px;
    margin-bottom: 39px;
`;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${({ theme }) => theme.deepGrey};
`;

const BasicModal = ({ onPress, title, visible, src }) => {
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    return (
        <Modal animationType="fade" transparent={true} visible={visible}>
            <OpacityBackground />
            <Wrap height={height}>
                <ModalContainer width={width}>
                    <ContentContainer>
                        <StyledImage source={src} resizeMode="contain" />
                        <StyledText>{title}</StyledText>
                    </ContentContainer>
                    <Button onPress={onPress} title="닫기" />
                </ModalContainer>
            </Wrap>
        </Modal>
    );
};

export default BasicModal;
