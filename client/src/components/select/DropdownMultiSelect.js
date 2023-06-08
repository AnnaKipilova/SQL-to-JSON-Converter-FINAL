// prevzaté z https://codesandbox.io/embed/ecstatic-waterfall-e87xz

import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import MySelect from "./MySelect.js";
import { components } from "react-select";
import { useTranslation } from 'react-i18next';

const DropdownMultiSelect = (
    {
        allOptions,
        selectedOptions
    }) => {

    const { t, i18n } = useTranslation();

    const Option = props => {
        return (
            <div>
            <components.Option {...props}>
                <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
                />{" "}
                <label>{props.label}</label>
            </components.Option>
            </div>
        );
    };
        
    const allOption = {
        label: t('dropdownMultiSelectSelectAll'),
        value: "*"
    };
    
    const ValueContainer = ({ children, ...props }) => {
    const { t } = useTranslation();
    const currentValues = props.getValue();
    let toBeRendered = children;
    if (currentValues.some(val => val.value === allOption.value)) {
        toBeRendered = [[children[0][0]], children[1]];
    }
    
    return (
        <components.ValueContainer {...props}>
        {toBeRendered}
        </components.ValueContainer>
    );
    };
    
    const MultiValue = props => {
    const { t } = useTranslation();
    let labelToBeDisplayed = `${props.data.label}, `;
    if (props.data.value === allOption.value) {
        labelToBeDisplayed = t('dropdownMultiSelectAllIsSelected');
    }
    return (
        <components.MultiValue {...props} >
        <span>{labelToBeDisplayed}</span>
        </components.MultiValue>
    );
    };

    const animatedComponents = makeAnimated();

  const [optionSelected, setOptionSelected] = useState(null);

  const handleChange = selected => {
    setOptionSelected(selected);
    console.log(selected);
    selectedOptions(selected);
    
  };

  return (
    <span
      className="d-inline-block"
      data-toggle="popover"
      data-trigger="focus"
      data-content={t('dropdownMultiSelectSelectAll')}
    >
      <MySelect
        options={allOptions}
        isMulti
        closeMenuOnSelect={true}
        // closeMenuOnSelect={isMulti}
        hideSelectedOptions={false}
        components={{
          Option,
          MultiValue,
          ValueContainer,
          animatedComponents
        }}
        onChange={handleChange}
        allowSelectAll={true}
        value={optionSelected}
        placeholder={t('dropdownMultiSelectPlaceholder')}
        disable={true}
      />
    </span>
  );
};

export default DropdownMultiSelect;
