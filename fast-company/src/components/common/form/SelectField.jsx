import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, defaultOption, professions, error, name }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  const professionsArray =
    !Array.isArray(professions) && typeof options === "object"
      ? Object.keys(professions).map((professionName) => ({
          name: professions[professionName].name,
          value: professions[professionName]._id
        }))
      : professions;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {professionsArray &&
          professionsArray.map((profession) => (
            <option key={professions.value} value={professions.value}>
              {profession.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
