import React from "react";
import styled from "styled-components";
import WeekButton from "./WeekButton";
import { useSelector, useDispatch } from "react-redux";
import { stateAlarms } from "stores/alarms/alarmsSlice.js";
import actionsAlarms from "stores/alarms/alarmsActions.js";

const Wrap = styled.View`
    height: 60px;
    flex-direction: row;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.background};
`;

const WeekButtonContainer = ({ weekAll, setWeekAll, week, setWeek }) => {
    const dispatch = useDispatch();
    return (
        <Wrap>
            <WeekButton
                title={weekAll[0].day}
                onPress={() => {
                    dispatch(
                        actionsAlarms.allWeekCheck({
                            week,
                            setWeek,
                            weekAll,
                            setWeekAll,
                        })
                    );
                }}
                checked={weekAll[0].checked}
            />
            {week.map((item) => {
                return (
                    <WeekButton
                        title={item.day}
                        id={item.id}
                        key={item.id}
                        onPress={(id) => {
                            dispatch(
                                actionsAlarms.weekCheck({
                                    id,
                                    week,
                                    setWeek,
                                    weekAll,
                                    setWeekAll,
                                })
                            );
                        }}
                        checked={item.checked}
                    />
                );
            })}
        </Wrap>
    );
};

export default WeekButtonContainer;
