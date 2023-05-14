import React from "react";
import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import useValidation from "../hooks/useValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, onChange, setValues, resetValidation, isValid } =
    useValidation();

  React.useEffect(() => {
    resetValidation(values, errors);
  }, [isOpen]);

  useEffect(() => {
    setValues({
      name: currentUser.name || "",
      about: currentUser.about || "",
    });
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label>
        <input
          required
          type="text"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          name="name"
          id="name"
          className="popup__input popup__input_type_name"
          value={values.name || ""}
          onChange={onChange}
        />
        <span className="popup__error" id="name-error">
          {errors.name || ""}
        </span>
      </label>
      <label>
        <input
          required
          type="text"
          minLength="2"
          maxLength="200"
          placeholder="О Себе "
          name="about"
          id="proffesion"
          className="popup__input popup__input_type_profession"
          value={values.about || ""}
          onChange={onChange}
        />
        <span className="popup__error" id="proffesion-error">
          {errors.about || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
