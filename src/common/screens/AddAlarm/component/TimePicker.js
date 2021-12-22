import React, { useState, useContext, useEffect } from "react";
import { Button, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styled, { ThemeContext } from "styled-components/native";
import { useDispatch } from "react-redux";
import { stateAlarms } from "stores/alarms/alarmsSlice.js";
import actionsAlarms from "stores/alarms/alarmsActions.js";

const Container = styled.View`
    background-color: white;
    width: 100%;
`;
const StyledInput = styled.TextInput`
    width: 100%;
    font-size: 16px;
    color: #000;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.line};
    border-radius: 12px;
    padding: 10px;
`;

Date.prototype.format = function (f) {
    if (!this.valueOf()) return " ";

    var weekName = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일",
    ];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
        switch ($1) {
            case "yyyy":
                return d.getFullYear();
            case "yy":
                return (d.getFullYear() % 1000).zf(2);
            case "MM":
                return (d.getMonth() + 1).zf(2);
            case "dd":
                return d.getDate().zf(2);
            case "E":
                return weekName[d.getDay()];
            case "HH":
                return d.getHours().zf(2);
            case "hh":
                return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm":
                return d.getMinutes().zf(2);
            case "ss":
                return d.getSeconds().zf(2);
            case "a/p":
                return d.getHours() < 12 ? "오전" : "오후";
            default:
                return $1;
        }
    });
};

String.prototype.string = function (len) {
    var s = "",
        i = 0;
    while (i++ < len) {
        s += this;
    }
    return s;
};
String.prototype.zf = function (len) {
    return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
    return this.toString().zf(len);
};

function TimePicker({ onPress, getTime }) {
    const theme = useContext(ThemeContext);
    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const placeholder = "알람시간을 설정해주세요.";
    const [text, setText] = useState(getTime);

    useEffect(() => {
        setText(getTime);
    }, [getTime]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setText(
            date.format("a/p ") +
                date.format("hh:").replace(/(^0+)/, "") +
                date.format("mm")
        );
        onPress(
            date.format("a/p ") +
                date.format("hh:").replace(/(^0+)/, "") +
                date.format("mm")
        );
        // timeWithColon에 00:00:00 형태를 저장
        dispatch(actionsAlarms.setTimeWithColon(date.format("HH:mm:dd")));
    };

    return (
        <TouchableOpacity onPress={showDatePicker}>
            <Container>
                <StyledInput
                    pointerEvents="none"
                    placeholder={placeholder}
                    placeholderTextColor={theme.inputPlaceholderText}
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={text}
                />
                {/* <Button title="Show Date Picker" /> */}
                <DateTimePickerModal
                    // headerTextIOS={placeholder}
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </Container>
        </TouchableOpacity>
    );
}

export default TimePicker;
