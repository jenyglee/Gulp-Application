import { configure, makeAutoObservable } from "mobx";

configure({
    // 컴포넌트에서 값을 수정해도 경고를 뜨지 않게 해줌.
    enforceActions: "never",
    // useProxies: 'never'
});

export default class MedicinesStore {
    constructor() {
        makeAutoObservable(this);
    }

    medicines = [];
    medicine = {
        name: "",
        age: "",
    };

    medicinesCreate() {
        this.medicines.push({
            name: this.medicine.name,
            age: this.medicine.age,
        });
        console.log("Done medicinesCreate", this.medicines);
    }
}

export const medicinesStore = new MedicinesStore();
