import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, error, professions }) => {
  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        label={label}
        id="validationCustom04"
        name="profession"
        value={value}
        onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {professions &&
          professions.map((profession) => (
            <option key={profession._id} value={profession._id}>
              {profession.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  error: PropTypes.string,
  professions: PropTypes.array
};

export default SelectField;
