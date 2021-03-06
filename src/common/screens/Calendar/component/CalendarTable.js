import React, { useState, useContext, useEffect } from "react";
import { View, Image } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import styled, { ThemeContext } from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import CalendarTitle from "@/common/screens/Calendar/component/CalendarTitle";
import { icons30px } from "@/icons";

import { useDispatch } from "react-redux";
import actionsCalendar from "stores/calendar/calendarActions";

const Arrow = () => {
    return <AntDesign name="caretleft" size={24} color="black" />;
};

const CalendarTable = () => {
    const dispatch = useDispatch();
    LocaleConfig.locales["fr"] = {
        monthNames: [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
        ],

        dayNames: [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
        ],
        dayNamesShort: ["토", "일", "월", "화", "수", "목", "금"],
        today: "ios'hui",
    };
    LocaleConfig.defaultLocale = "fr";

    const vacation = {
        key: "vacation",
        color: "red",
        selectedDotColor: "blue",
    };
    const massage = { key: "massage", color: "blue", selectedDotColor: "blue" };
    const workout = { key: "workout", color: "green" };
    const [date, setDate] = useState("");
    const theme = useContext(ThemeContext);
    const [month, setMonth] = useState("");

    return (
        <View>
            {/* <CalendarTitle month={month} onPressLeft={} onPressRight={} /> */}
            <Calendar
                // Initially visible month. Default = Date()
                gulpPercent={30}
                current={"2021-08-23"}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={"2021-01-01"}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                maxDate={"2021-12-31"}
                // Handler which gets executed on day press. Default = undefined
                onDayPress={(day) => {
                    console.log("selected day", day);
                }}
                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {
                    console.log("selected day", day);
                }}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={"MM월"}
                // monthFormat={""}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {
                    console.log("month changed", month);
                    setMonth(month.month);
                }}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                // renderArrow={() => <Arrow />}
                renderArrow={(direction) => {
                    if (direction == "left")
                        return (
                            <Image
                                source={icons30px.leftArrow_w}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                        );
                    if (direction == "right")
                        return (
                            <Image
                                source={icons30px.rightArrow_w}
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                                resizeMode="contain"
                            />
                        );
                }}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={false}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                // onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowLeft={(goBack) => goBack()}
                // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                // onPressArrowRight={(addMonth) => addMonth()}
                onPressArrowRight={(goFuture) => goFuture()}
                // Disable left arrow. Default = false
                disableArrowLeft={false}
                // Disable right arrow. Default = false
                disableArrowRight={false}
                // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                disableAllTouchEventsForDisabledDays={true}
                // Enable the option to swipe between months. Default = false
                enableSwipeMonths={true}
                markingType="dot"
                onDayPress={(day) => {
                    // ✨ 배열에 클릭한 날짜 추가
                    // const selectedDay = `${day.year}-${
                    //     day.month > 9 ? day.month : `0${day.month}`
                    // }-${day.day > 9 ? day.day : `0${day.day}`}`;
                    setDate(day.dateString);
                    dispatch(actionsCalendar.setSelectedDate(day.dateString));
                }}
                markedDates={{
                    // ✨ 배열에 추가된 날짜에 효과주기
                    [date]: {
                        selected: true,
                        // marked: true,
                        selectedColor: theme.main,
                    },
                }}
                style={{
                    padding: 20,
                    marginBottom: 20,
                    borderRadius: 12,
                }}
            />
        </View>
    );
};
export default CalendarTable;
