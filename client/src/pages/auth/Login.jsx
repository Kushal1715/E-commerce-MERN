import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialFormData = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData);

  const onSubmit = () => {};
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p>
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="font-bold hover:cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Login"
      />
    </div>
  );
};

export default AuthLogin;
