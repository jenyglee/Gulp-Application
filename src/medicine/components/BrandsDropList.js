import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import BrandsDropListItem from "./BrandsDropListItem";


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
