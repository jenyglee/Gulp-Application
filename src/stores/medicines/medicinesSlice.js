import { createSlice } from "@reduxjs/toolkit";

export const medicinesSlice = createSlice({
    name: "medicines",
    initialState: {
        medicineList: [],
        categoryData: [],
        category: { name: "선택" },
        categoryKey: "",
        brand: "",
        brandKey: "", // 이걸로 해당 브랜드의 약만 노출하게 한다.
        medicine: "",
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
    },
});

export const stateMedicines = (state) => state.medicines;
export const actionsMedicines = medicinesSlice.actions;

export default medicinesSlice.reducer;
