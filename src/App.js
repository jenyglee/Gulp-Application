import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./common/navigations/index";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Provider } from "mobx-react";
import { medicinesStore } from "./stores/MedicinesStore.js";
import { alarmsStore } from "./stores/AlarmsStore";

export default function App() {
    return (
        <Provider alarmsStore={alarmsStore} medicinesStore={medicinesStore}>
            <ThemeProvider theme={theme}>
                <StatusBar style="auto" />
                <Navigation />
            </ThemeProvider>
        </Provider>
    );
}
