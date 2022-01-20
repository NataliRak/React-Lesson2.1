import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ options, onChange, name, label }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={optionsArray}
        className="basic-multi-select bg-dark text-white"
        classNamePrefix="select"
        onChange={handleChange}
        name={name}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          backgroundColor: "black",
          color: "black",
          colors: {
            ...theme.colors,
            primary25: "black"
          }
        })}
      />
    </div>
  );
};
MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string
};

export default MultiSelectField;
