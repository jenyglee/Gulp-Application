import React, { useContext } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled, { ThemeContext } from "styled-components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { AlarmList, Calendar, Rank, AddAlarm } from "@screens/index";
import AddMedicine from "@/medicine/screens/AddMedicine";
import MyPage from "@/member/screens/Mypage/container/MyPage";
import CustomInfo from "@/member/screens/CustomInfo/container/CustomInfo";
import Signin from "@/member/screens/Signin/container/Signin";
import { Signup00, Signup01, Signup02 } from "@/member/screens/Signup/index";
import {
    FindPassword00,
    FindPassword01,
} from "@/member/screens/FindPassword/index";
import { icons30px } from "@/icons";

const option = {
    headerBackTitleVisible: false,
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
const backImage = {
    headerBackImage: () => {
        return <Icon source={icons30px.leftArrow} resizeMode="contain" />;
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
                    ...option,
                    headerTitle: "캘린더",
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
                    ...option,
                    headerTitle: "영양제 랭킹",
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
                    ...option,
                    headerTitle: "마이페이지",
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
                options={() => {
                    return {
                        ...option,
                        ...backImage,
                        headerTitle: "알람추가",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                            backgroundColor: "#fff",
                        },
                    };
                }}
            />
            <HomeStack.Screen
                name="AddMedicine"
                component={AddMedicine}
                options={() => {
                    return {
                        ...option,
                        ...backImage,
                        headerTitle: "알람추가",
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                            backgroundColor: "#fff",
                        },
                    };
                }}
            />
            <HomeStack.Screen
                name="Signin"
                component={Signin}
                options={{
                    ...option,
                    ...backImage,
                    headerTitle: "로그인",
                    headerStyle: {
                        shadowOffset: {
                            header: 0,
                        },
                        backgroundColor: "#fff",
                    },
                }}
            />
            <HomeStack.Screen
                name="Signup00"
                component={Signup00}
                options={({ navigation }) => {
                    return {
                        ...option,
                        ...backImage,
                        cardStyle: {
                            backgroundColor: theme.background,
                        },
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                            backgroundColor: "transparent",
                        },
                        headerTitle: "약관동의",

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
                    };
                }}
            />
            <HomeStack.Screen
                name="Signup01"
                component={Signup01}
                options={({ navigation }) => {
                    return {
                        ...option,
                        ...backImage,
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                            backgroundColor: "#fff",
                        },
                        headerTitle: "회원가입",

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
                    };
                }}
            />
            <HomeStack.Screen
                name="Signup02"
                component={Signup02}
                options={({ navigation }) => {
                    return {
                        ...option,
                        headerStyle: {
                            shadowOffset: {
                                header: 0,
                            },
                            backgroundColor: "#fff",
                        },
                        headerTitle: "회원가입",
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
                    };
                }}
            />
            <HomeStack.Screen
                name="FindPassword00"
                component={FindPassword00}
                options={({ navigation }) => {
                    return {
                        ...option,
                        headerTitle: "비밀번호 찾기",
                        headerStyle: {
                            backgroundColor: "#fff",
                            shadowOffset: {
                                header: 0,
                            },
                        },
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
                    };
                }}
            />
            <HomeStack.Screen
                name="FindPassword01"
                component={FindPassword01}
                options={({ navigation }) => {
                    return {
                        ...option,
                        headerTitle: "비밀번호 찾기",
                        headerStyle: {
                            backgroundColor: "#fff",
                            shadowOffset: {
                                header: 0,
                            },
                        },
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
                    };
                }}
            />
            <HomeStack.Screen
                name="CustomInfo"
                component={CustomInfo}
                options={{
                    ...option,
                    ...backImage,
                    headerTitle: "회원정보 변경",
                    headerStyle: {
                        shadowOffset: {
                            header: 0,
                        },
                        backgroundColor: "#fff",
                    },
                }}
            />
        </HomeStack.Navigator>
    );
};
export default HomeStackNav;
