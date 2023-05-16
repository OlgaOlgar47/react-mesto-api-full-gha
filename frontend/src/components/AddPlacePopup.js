import React from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../hooks/useValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, onChange, resetValidation } =
    useValidation();

  React.useEffect(() => {
    resetValidation(values, errors);
  }, [isOpen, errors, resetValidation, values]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="add"
      buttonText="Создать"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label>
        <input
          required
          minLength="2"
          maxLength="30"
          type="text"
          placeholder="Название"
          name="name"
          id="placeName"
          className="popup__input popup__input_type_card-name"
          onChange={onChange}
          value={values.name || ""}
        />
        <span className="popup__error" id="placeName-error">
          {errors.name || ""}
        </span>
      </label>
      <label>
        <input
          required
          type="url"
          placeholder="Ссылка на картинку"
          name="link"
          id="link"
          className="popup__input popup__input_type_card-link"
          onChange={onChange}
          values={values.link || ""}
        />
        <span className="popup__error" id="link-error">
          {errors.link || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
