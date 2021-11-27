import React from "react";
import { View } from "react-native";
import MedicinesDropListItem from "./MedicinesDropListItem";

const MedicinesDropList = ({ filtered, onSelectItem }) => {
    return (
        <View>
            {
                filtered.map((item, index)=>{
                    return <MedicinesDropListItem key={index} onSelectItem={onSelectItem} item={item} />
                })
            }
        </View>
    );
};

export default MedicinesDropList;
