import React from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
  const { onRegister, values, errors, onChange } = props;

  return (
    <AuthForm
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={onRegister}
      values={values}
      errors={errors}
      onChange={onChange}
    >
      <Link to="/sign-in" className="authorization__span">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}

export default Register;
