import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialFormData = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData);

  const onSubmit = () => {};
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-foreground">
          Create new account
        </h1>
        <p>
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-bold hover:cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign Up"
      />
    </div>
  );
};

export default AuthRegister;
