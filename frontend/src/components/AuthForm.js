import React from "react";

function AuthForm(props) {
  const {
    name,
    buttonText,
    title,
    onSubmit,
    values,
    errors,
    onChange,
    children,
  } = props;

  return (
    <div className="authorization">
      <div className="popup__container popup__container_type_auth">
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className="popup__title popup__title_type_auth">{title}</h2>
          <label>
            <input
              required
              type="email"
              minLength="2"
              maxLength="40"
              placeholder="Email"
              name="email"
              id="email"
              className="popup__input popup__input_type_auth"
              onChange={onChange}
              value={values.email || ""}
            />
            <span className="popup__error" id="email-error">
              {errors.email || ""}
            </span>
          </label>
          <label>
            <input
              required
              type="password"
              minLength="2"
              maxLength="200"
              placeholder="Пароль"
              name="password"
              id="password"
              className="popup__input popup__input_type_auth"
              onChange={onChange}
              value={values.password || ""}
            />
            <span className="popup__error" id="password-error">
              {errors.password || ""}
            </span>
          </label>
          <button
            type="submit popup__submit_type_auth"
            className="popup__submit popup__submit_type_auth"
            aria-label={title}
          >
            {buttonText}
          </button>
          {children}
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
