import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./common/navigations/index";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./theme";
import { Provider } from "mobx-react";
import { medicinesStore } from "./stores/MedicinesStore.js";
import { alarmsStore } from "./stores/AlarmsStore";
import { commonStore } from "./stores/CommonStore";
import { Provider as ProviderRedux } from "react-redux";
import store from "./stores/index.js";

// ✨ 스플래시 이미지 조정
// import SplashScreen from 'react-native-splash-screen';
// useEffect(() => {
//     SplashScreen.hide();
//   }, []);

export default function App() {
    // console.log(ProviderRedux);
    return (
        <ProviderRedux store={store}>
            <Provider
                alarmsStore={alarmsStore}
                commonStore={commonStore}
                medicinesStore={medicinesStore}
            >
                <ThemeProvider theme={theme}>
                    <StatusBar style="auto" />
                    <Navigation />
                </ThemeProvider>
            </Provider>
        </ProviderRedux>
    );
}
