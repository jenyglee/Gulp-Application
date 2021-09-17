import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNav from "./Stack";

const Navigation = () => {
    return (
        <NavigationContainer>
            <HomeStackNav />
        </NavigationContainer>
    );
};

export default Navigation;
