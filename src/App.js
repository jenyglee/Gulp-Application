import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./common/navigations/index";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Provider } from "mobx-react";
import { medicinesStore } from "./stores/MedicinesStore.js";
import { alarmsStore } from "./stores/AlarmsStore";
import { commonStore } from "./stores/CommonStore";
// import memberStore from "./stores/MemberStore";
import { Provider as ProviderRedux } from "react-redux";
import store from "./stores/index.js";

export default function App() {
    console.log(ProviderRedux);
    return (
        <ProviderRedux store={store}>
            <Provider
                alarmsStore={alarmsStore}
                commonStore={commonStore}
                medicinesStore={medicinesStore}
                // memberStore={memberStore}
            >
                <ThemeProvider theme={theme}>
                    <StatusBar style="auto" />
                    <Navigation />
                </ThemeProvider>
            </Provider>
        </ProviderRedux>
    );
}
