import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AlarmList, Calendar, Rank, AddAlarm } from "@screens/index";
import AddMedicine from "@/medicine/screens/AddMedicine";
import MyPage from "@/member/screens/Mypage/container/MyPage";
import Signin from "@/member/screens/Signin/container/Signin";
import { Signup00, Signup01 } from "@/member/screens/Signup/index";
import {
    FindPassword00,
    FindPassword01,
} from "@/member/screens/FindPassword/index";
import { icons30px } from "@/icons";

const headerStyle = {
    headerBackTitleVisible: false,
    headerTitle: "회원가입",
    headerStyle: {
        shadowOffset: {
            header: 0,
        },
        backgroundColor: "transparent",
    },
    headerTitleStyle: {
        fontSize: 20,
        fontWeight: "900",
    },
    headerLeftContainerStyle: {
        paddingLeft: 24,
    },
    headerTitleAlign: "center",
    headerRightContainerStyle: {
        paddingRight: 24,
    },
};

const Icon = styled.Image`
    width: 30px;
`;

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
    const theme = useContext(ThemeContext);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    borderTopColor: theme.line,
                    borderTopWidth: 2,
                },
                tabBarActiveTintColor: theme.main,
                tabBarInactiveTintColor: theme.textDisable,
            }}
        >
            <Tab.Screen
                name="Home"
                component={AlarmList}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                source={
                                    props.focused
                                        ? icons30px.alarm
                                        : icons30px.alarmDisable
                                }
                                resizeMode="contain"
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Calendar"
                component={Calendar}
                options={{
                    headerTitle: "캘린더",
                    headerStyle: {
                        shadowOffset: {
                            header: 0,
                        },
                        backgroundColor: "transparent",
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "900",
                    },
                    headerTitleAlign: "center",
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                source={
                                    props.focused
                                        ? icons30px.calendar
                                        : icons30px.calendarDisable
                                }
                                resizeMode="contain"
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Rank"
                component={Rank}
                options={{
                    headerTitle: "영양제 랭킹",
                    headerStyle: {
                        shadowOffset: {
                            header: 0,
                        },
                        backgroundColor: "transparent",
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "900",
                    },
                    headerTitleAlign: "center",
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                source={
                                    props.focused
                                        ? icons30px.rank
                                        : icons30px.rankDisable
                                }
                                resizeMode="contain"
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="MyPage"
                component={MyPage}
                options={{
                    headerTitle: "마이페이지",
                    headerStyle: {
                        shadowOffset: {
                            header: 0,
                        },
                        backgroundColor: "transparent",
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "900",
                    },
                    headerTitleAlign: "center",
                    tabBarIcon: (props) => {
                        return (
                            <Icon
                                source={
                                    props.focused
                                        ? icons30px.dot
                                        : icons30px.dotDisable
                                }
                                resizeMode="contain"
                            />
                        );
                    },
                }}
                // options={headerStyle}
            />
        </Tab.Navigator>
    );
};

const HomeStack = createStackNavigator();
const HomeStackNav = () => {
    const theme = useContext(ThemeContext);
    return (
        <HomeStack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: "#fff",
                },
            }}
        >
            <HomeStack.Screen
                name="AlarmList"
                component={HomeTabs}
                options={{
                    headerShown: false,
                }}
            />
            <HomeStack.Screen
                name="AddAlarm"
                component={AddAlarm}
                options={({ navigation }) => {
                    return {
                        headerBackTitleVisible: false,
                        headerBackImage: () => {
                            return (
                                <Icon
                                    source={icons30px.leftArrow}
                                    resizeMode="contain"
                                />
                            );
                        },

                        headerTitle: "알람추가",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                        },
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: "900",
                        },
                        headerLeftContainerStyle: {
                            paddingLeft: 24,
                        },
                        headerTitleAlign: "center",
                        headerRightContainerStyle: {
                            paddingRight: 24,
                        },
                    };
                }}
            />
            <HomeStack.Screen name="AddMedicine" component={AddMedicine} />
            <HomeStack.Screen
                name="Signin"
                component={Signin}
                options={{
                    headerBackTitleVisible: false,
                    headerBackImage: () => {
                        return (
                            <Icon
                                source={icons30px.leftArrow}
                                resizeMode="contain"
                            />
                        );
                    },

                    headerTitle: "회원가입",
                    headerStyle: {
                        shadowOffset: {
                            header: 0,
                        },
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: "900",
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: 24,
                    },
                    headerTitleAlign: "center",
                    headerRightContainerStyle: {
                        paddingRight: 24,
                    },
                }}
            />
            <HomeStack.Screen
                name="Signup00"
                component={Signup00}
                options={({ navigation }) => {
                    return {
                        headerBackTitleVisible: false,
                        headerBackImage: () => {
                            return (
                                <Icon
                                    source={icons30px.leftArrow}
                                    resizeMode="contain"
                                />
                            );
                        },
                        headerRight: () => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("AlarmList");
                                    }}
                                >
                                    <View>
                                        <Icon
                                            source={icons30px.home}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        },
                        headerTitle: "회원가입",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                        },
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: "900",
                        },
                        headerLeftContainerStyle: {
                            paddingLeft: 24,
                        },
                        headerTitleAlign: "center",
                        headerRightContainerStyle: {
                            paddingRight: 24,
                        },
                    };
                }}
            />
            <HomeStack.Screen
                name="Signup01"
                component={Signup01}
                options={({ navigation }) => {
                    return {
                        headerBackTitleVisible: false,
                        headerLeft: () => {
                            return null;
                        },
                        headerRight: () => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("AlarmList");
                                    }}
                                >
                                    <View>
                                        <Icon
                                            source={icons30px.home}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        },
                        headerTitle: "회원가입",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                        },
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: "900",
                        },
                        headerLeftContainerStyle: {
                            paddingLeft: 24,
                        },
                        headerTitleAlign: "center",
                        headerRightContainerStyle: {
                            paddingRight: 24,
                        },
                    };
                }}
            />
            <HomeStack.Screen
                name="FindPassword00"
                component={FindPassword00}
                options={({ navigation }) => {
                    return {
                        headerBackTitleVisible: false,
                        headerLeft: () => {
                            return null;
                        },
                        headerRight: () => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("AlarmList");
                                    }}
                                >
                                    <View>
                                        <Icon
                                            source={icons30px.home}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        },
                        headerTitle: "회원가입",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                        },
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: "900",
                        },
                        headerLeftContainerStyle: {
                            paddingLeft: 24,
                        },
                        headerTitleAlign: "center",
                        headerRightContainerStyle: {
                            paddingRight: 24,
                        },
                    };
                }}
            />
            <HomeStack.Screen
                name="FindPassword01"
                component={FindPassword01}
                options={({ navigation }) => {
                    return {
                        headerBackTitleVisible: false,
                        headerLeft: () => {
                            return null;
                        },
                        headerRight: () => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("AlarmList");
                                    }}
                                >
                                    <View>
                                        <Icon
                                            source={icons30px.home}
                                            resizeMode="contain"
                                        />
                                    </View>
                                </TouchableOpacity>
                            );
                        },
                        headerTitle: "회원가입",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                        },
                        headerTitleStyle: {
                            fontSize: 20,
                            fontWeight: "900",
                        },
                        headerLeftContainerStyle: {
                            paddingLeft: 24,
                        },
                        headerTitleAlign: "center",
                        headerRightContainerStyle: {
                            paddingRight: 24,
                        },
                    };
                }}
            />
        </HomeStack.Navigator>
    );
};

export default HomeStackNav;
