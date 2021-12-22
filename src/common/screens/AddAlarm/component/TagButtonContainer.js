import React, { useEffect } from "react";
import styled from "styled-components/native";
import TagButton from "./TagButton";
import { inject, observer } from "mobx-react";
import { stateMedicines } from "stores/medicines/medicinesSlice";
import actionsMedicines from "stores/medicines/medicineActions";
import { useDispatch, useSelector } from "react-redux";

const TagButtonContainer = () => {
    const dispatch = useDispatch();
    const { medicineList } = useSelector(stateMedicines);
    return (
        <>
            {medicineList
                ? Object.values(medicineList).map((item) => {
                      //   console.log(item);
                      return (
                          <TagButton
                              name={item.name}
                              brand={item.brandName}
                              id={item.id}
                              key={item.id}
                              deleteTask={(id) => {
                                  dispatch(
                                      actionsMedicines.deleteMedicine(
                                          id,
                                          medicineList
                                      )
                                  );
                              }}
                          />
                      );
                  })
                : null}
        </>
    );
};

export default TagButtonContainer;
