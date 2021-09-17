import React, { useContext, useEffect } from "react";
import styled, { ThemeContext } from "styled-components";
import { Alert, Platform } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const Container = styled.View`
    margin-bottom: 50px;
`;

const StyledImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: ${({ theme }) => theme.lightGrey};
`;

const PhotoContainer = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    position: absolute;
    bottom: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.lightGrey};
`;

const PhotoIcon = () => {
    const theme = useContext(ThemeContext);
    return <MaterialIcons name="camera-alt" size={20} color={theme.deepGrey} />;
};

const PhotoBtn = ({ onPress }) => {
    return (
        <PhotoContainer onPress={onPress}>
            <PhotoIcon />
        </PhotoContainer>
    );
};

const Image = ({ url, onChangePhoto }) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    Alert.alert(
                        "Photo permission",
                        "Please turn on the photo permission."
                    );
                }
            }
        })();
    }, []);

    const _handlePhotoBtnPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            onChangePhoto(result.uri);
        }
    };

    return (
        <Container>
            <StyledImage source={{ uri: url }} />
            <PhotoBtn onPress={_handlePhotoBtnPress} />
        </Container>
    );
};

export default Image;
