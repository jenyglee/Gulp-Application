import { createSlice } from "@reduxjs/toolkit";

export const medicinesSlice = createSlice({
    name: "medicines",
    initialState: {
        // medicines: [],
        // medicine: {
        //     name: "",
        //     age: "",
        // },

        medicineList : {},
    },
    reducers: {
        // medicineSet: (state, action) => {
        //     state.medicine = action.payload;
        // },
        // medicinesCreate: (state, action) => {
        //     state.medicines.push(action.payload);
        // },
        setMedicineList(state, action) {
            state.medicineList = action.payload;
        },
    },
});

export const stateMedicines = (state) => state.medicines;
export const actionsMedicines = medicinesSlice.actions;

export default medicinesSlice.reducer;
