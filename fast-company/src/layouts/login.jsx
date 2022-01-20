import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/LoginForm";
import RegisterForm from "../components/ui/RegisterForm";

const Login = () => {
  const { type } = useParams();
  const [typeForm, setTypeForm] = useState(type === "register" ? type : "login");

  const handleToogle = (params) => {
    setTypeForm((prevState) => (prevState === "register" ? "login" : "register"));
  };
  return (
    <>
      <div className="container w-50 mt-5">
        <div className="row">
          <div className=" col-md-6 offset-md-3 shadow p-4 bg-dark p-2 text-white">
            {typeForm === "register" ? (
              <>
                <RegisterForm />
                <p>
                  Already have account?
                  <a role="button" onClick={handleToogle}>
                    Sing In
                  </a>
                </p>
              </>
            ) : (
              <>
                <LoginForm />
                <p>
                  Dont have account?
                  <a role="button" onClick={handleToogle}>
                    Sing Up
                  </a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
