import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./common/navigations/index";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <StatusBar style="auto" />
            <Navigation />
        </ThemeProvider>
    );
}
