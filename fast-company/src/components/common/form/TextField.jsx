import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, name, value, type, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const toogleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          className={getInputClasses()}
          type={showPassword ? "text" : type}
          id={name}
          value={value}
          name={name}
          onChange={handleChange}
        />
        {type === "password" && (
          <button className="btn btn-outline-secondary" type="button" onClick={toogleShowPassword}>
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};
TextField.defaultProps = {
  type: "text"
};
TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
