import { createSlice } from "@reduxjs/toolkit";

export const medicinesSlice = createSlice({
    name: "medicines",
    initialState: {
        medicineList: [],
        categoryData: [
            // { id: 0, name: "비타민C" },
            // { id: 1, name: "비타민B" },
            // { id: 2, name: "멀티비타민" },
            // { id: 3, name: "칼슘/마그네슘/비타민D" },
            // { id: 4, name: "오메가 3" },
            // { id: 5, name: "프로바이오틱스" },
            // { id: 6, name: "프로폴리스" },
            // { id: 7, name: "눈영양루테인" },
            // { id: 8, name: "쏘팔메토/아연" },
            // { id: 9, name: "밀크씨슬" },
            // { id: 10, name: "철분" },
            // { id: 11, name: "기타" },
        ],
        category: { name: "선택" },
        categoryKey: "",
        brand: "",
        brandKey: "", // 이걸로 해당 브랜드의 약만 노출하게 한다.
        medicine: "",
        // filtered : [],
    },
    reducers: {
        setMedicineList(state, action) {
            state.medicineList = action.payload;
        },
        setCategoryData(state, action) {
            state.categoryData = action.payload;
        },
        setCategory(state, action) {
            state.category = action.payload;
        },
        setCategoryKey(state, action) {
            state.categoryKey = action.payload;
        },
        setBrand(state, action) {
            state.brand = action.payload;
        },
        setBrandKey(state, action) {
            state.brandKey = action.payload;
        },
        setMedicine(state, action) {
            state.medicine = action.payload;
        },
        // setFiltered(state, action){
        //     state.filtered = action.payload
        // }
    },
});

export const stateMedicines = (state) => state.medicines;
export const actionsMedicines = medicinesSlice.actions;

export default medicinesSlice.reducer;
