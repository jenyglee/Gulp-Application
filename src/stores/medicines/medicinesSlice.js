import { createSlice } from "@reduxjs/toolkit";

export const medicinesSlice = createSlice({
    name: "medicines",
    initialState: {
        medicineList : {},
        categoryData : [
            { id: 0, title: "비타민C" },
            { id: 1, title: "비타민B" },
            { id: 2, title: "멀티비타민" },
            { id: 3, title: "칼슘/마그네슘/비타민D" },
            { id: 4, title: "오메가 3" },
            { id: 5, title: "프로바이오틱스" },
            { id: 6, title: "프로폴리스" },
            { id: 7, title: "눈영양루테인" },
            { id: 8, title: "쏘팔메토/아연" },
            { id: 9, title: "밀크씨슬" },
            { id: 10, title: "철분" },
            { id: 11, title: "기타" },
        ],
        category : {title:"선택"},
        brand : "",
        brandKey : "",
        medicine : ""
        // filtered : [],
    },
    reducers: {
        setMedicineList(state, action) {
            state.medicineList = action.payload;
        },
        setCategory(state, action){
            state.category = action.payload
        },
        setBrand(state, action){
            state.brand = action.payload
        },
        setBrandKey(state, action){
            state.brandKey = action.payload
        },
        setMedicine(state, action){
            state.medicine = action.payload
        },
        // setFiltered(state, action){
        //     state.filtered = action.payload
        // }
    },
});

export const stateMedicines = (state) => state.medicines;
export const actionsMedicines = medicinesSlice.actions;

export default medicinesSlice.reducer;
