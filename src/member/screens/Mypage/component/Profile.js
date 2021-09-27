import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Platform } from "react-native";
import { icons35px } from "@/icons";
import * as ImagePicker from "expo-image-picker";

const Container = styled.View`
    width: 100%;
    height: auto;
    padding: 20px;
    align-items: center;
`;

const ImageContainer = styled.View`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    margin: 25px 0 20px;
    background-color: ${({ theme }) => theme.white};
`;

const SampleImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

const Camera = styled.TouchableOpacity`
    width: 35px;
    height: 35px;
    position: absolute;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
`;

const CameraBtn = styled.Image`
    width: 100%;
    height: 100%;
`;

const TextContainer = styled.View`
    align-items: center;
    margin-bottom: 30px;
`;

const NickName = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: ${({ theme }) => theme.textBasic};
    margin-bottom: 5px;
`;

const Grade = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.textBasic};
`;

const DEFAULT_PHOTO =
    "https://firebasestorage.googleapis.com/v0/b/medicine-cc1f6.appspot.com/o/face.png?alt=media";

const Profile = () => {
    const [photo, setPhoto] = useState(DEFAULT_PHOTO);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("사진 접근 권한을 허용해주세요.");
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setPhoto(result.uri);
        }
    };
    return (
        <Container>
            {/* <ProfileImage /> */}
            <ImageContainer>
                <SampleImage source={{ uri: photo }} resizeMode="contain" />
                <Camera onPress={pickImage}>
                    <CameraBtn source={icons35px.camera} resizeMode="contain" />
                </Camera>
            </ImageContainer>
            <TextContainer>
                <NickName>꿀꺽이</NickName>
                <Grade>자기관리 꿈나무</Grade>
            </TextContainer>
        </Container>
    );
};

export default Profile;
