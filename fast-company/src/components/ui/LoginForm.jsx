import React, { useEffect, useState } from "react";
import TextField from "../common/form/TextField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/CheckBoxField";
// import * as yup from "yup";

const LoginForm = () => {
  const [data, setDate] = useState({
    email: "",
    password: "",
    stayOn: false
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setDate((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная пошта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязательный для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
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
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button type="submit" disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;

// const validateSchema = yup.object().shape({
//   password: yup
//     .string()
//     .required("password is required field")
//     .matches(/(?=.*[A-Z])/, "password must contain at least 1 uppercase letter")
//     .matches(/(?=.*[0-9])/, "password must contain at least 1 number")
//     .matches(/(?=.*[@!$#%*&])/, "password must contain at least 1 special symbol")
//     .matches(/(?=.{8,})/, "password must contain at least 8 characters"),

//   email: yup.string().required("email is required field").email("email wrong")
// });

// const validate = () => {
//
//   validateSchema
//     .validate(data)
//     .then(() => setErrors({}))
//     .catch((err) => setErrors({ [err.path]: err.massage }));

//
//   return Object.keys(errors).length === 0;
// };
