import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { BrandsDropListItem } from "@/medicine/components/index";

const Container = styled.View`
    width: 100%;
    height: 70px;
    margin: 5px;
    background-color: #fefefe;
    border: 1px solid #ddd;
`;

const StyledText = styled.Text`
    font-size: 18px;
    color: #000;
`;

const BrandsDropList = ({ filtered, onSelectItem }) => {
    return (
        <View>
            {
                filtered.map((item, index)=>{
                    return <BrandsDropListItem key={index} onSelectItem={onSelectItem} item={item} />
                })
            }
        </View>
    );
};

export default BrandsDropList;
