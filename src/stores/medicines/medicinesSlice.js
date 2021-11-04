import { createSlice } from "@reduxjs/toolkit";

export const medicinesSlice = createSlice({
    name: "medicines",
    initialState: {
        medicineList : {},
    },
    reducers: {
        setMedicineList(state, action) {
            state.medicineList = action.payload;
        },
    },
});

export const stateMedicines = (state) => state.medicines;
export const actionsMedicines = medicinesSlice.actions;

export default medicinesSlice.reducer;
