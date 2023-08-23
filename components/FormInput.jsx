import React from "react";

const FormInput = (props) => {
  const { inputLabel, inputName, register, placeholderText, type, errors, defaultValue } = props;

  return (
    <>
      <div className="flex justify-between items-center">
        <label htmlFor={inputName} className="text-lg">{inputLabel}</label>
        <span className="text-red-700">
          {errors[inputName] && errors[inputName].message}
        </span>
      </div>
      <input
        className="border border-brownShade
                 focus:ring-offset-brownHover focus:border-brownHover focus:ring-brownHover bg-brownShadeAlt rounded-lg placeholder-gray-400 text-sm"
        {...register(inputName)}
        type={type}
        id={inputName}
        placeholder={placeholderText}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default FormInput;
