import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
    name: "calendar",
    initialState: {
        historyData: [
            {
                id: 1,
                date: "2021-08-01",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 2,
                date: "2021-08-02",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 3,
                date: "2021-08-03",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 4,
                date: "2021-08-04",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 5,
                date: "2021-08-05",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: true,
                    },
                ],
            },
            {
                id: 6,
                date: "2021-08-06",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: false,
                    },
                ],
            },
            {
                id: 7,
                date: "2021-08-07",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: true,
                    },
                ],
            },
            {
                id: 8,
                date: "2021-08-08",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: false,
                    },
                ],
            },
            {
                id: 9,
                date: "2021-08-09",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 10,
                date: "2021-08-10",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 11,
                date: "2021-08-11",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 12,
                date: "2021-08-12",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 13,
                date: "2021-08-13",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 14,
                date: "2021-08-14",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 15,
                date: "2021-08-15",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 16,
                date: "2021-08-16",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 00분",
                        medicines: [
                            {
                                id: 1,
                                name: "장에 좋은 프로 프리바이오틱스 4000 5g",
                            },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                            {
                                id: 3,
                                name: "안국 루테인 지아잔틴 포뮬라 500mg",
                            },
                        ],
                        completed: true,
                    },
                ],
            },
            {
                id: 17,
                date: "2021-08-17",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: false,
                    },
                ],
            },
            {
                id: 18,
                date: "2021-08-18",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: true,
                    },
                ],
            },
            {
                id: 19,
                date: "2021-08-19",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: false,
                    },
                ],
            },
            {
                id: 20,
                date: "2021-08-20",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: false,
                    },
                ],
            },
            {
                id: 21,
                date: "2021-08-21",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: true,
                    },
                ],
            },
            {
                id: 22,
                date: "2021-08-22",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 23,
                date: "2021-08-23",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 24,
                date: "2021-08-24",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 8시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: false,
                    },
                ],
            },
            {
                id: 25,
                date: "2021-08-25",
                alarms: [
                    {
                        id: 1,
                        time: "오전 9시 10분",
                        medicines: [
                            { id: 1, name: "멀티비타민 앤 미네랄 1450mg" },
                            { id: 2, name: "리얼트루 식물성 오메가3 700mg" },
                        ],
                        completed: true,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [{ id: 1, name: "눈에 좋은 루테인 플러스" }],
                        completed: true,
                    },
                ],
            },
            {
                id: 26,
                date: "2021-08-26",
                alarms: [
                    {
                        id: 1,
                        time: "오전 10시 00분",
                        medicines: [
                            { id: 1, name: "뼈에 좋은 해조 칼슘 900mg" },
                            {
                                id: 2,
                                name: "간에 좋은 밀크씨슬 실리마린 800mg",
                            },
                        ],
                        completed: false,
                    },
                    {
                        id: 2,
                        time: "오후 5시 00분",
                        medicines: [
                            { id: 1, name: "영국산100% 메가도스 비타민C3000" },
                        ],
                        completed: false,
                    },
                ],
            },
        ],
        selectedDate: "",
    },
    reducers: {
        setSelectedDate(state, action) {
            state.selectedDate = action.payload;
        },
    },
});

export const stateCalendar = (state) => state.calendar;
export const actionsCalendar = calendarSlice.actions;

export default calendarSlice.reducer;
