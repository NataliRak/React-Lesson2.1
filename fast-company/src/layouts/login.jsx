import React, { useEffect, useState } from "react";
import TextField from "../components/TextField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const validateConfig = {
    email: {
      isRequired: {
        message: "email is required field"
      },
      isEmail: {
        message: "email wrong"
      }
    },
    password: {
      isRequired: {
        message: "password is required field"
      },
      isCapitalSymbol: {
        message: "password must contain at least 1 uppercase letter"
      },
      isContainDigit: {
        message: "password must contain at least 1 number"
      },
      min: {
        message: "password must contain at least 8 characters",
        value: 8
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validateConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <div className="container w-50 mt-5">
      <div className="row">
        <div className=" col-md-6 offset-md-3 shadow p-4 bg-dark p-2 text-white">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              error={errors.email}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              error={errors.password}
            />
            <button
              className="btn rounded-pill btn-warning d-grid gap-2 col-6 mx-auto "
              type="submit"
              disabled={!isValid}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
