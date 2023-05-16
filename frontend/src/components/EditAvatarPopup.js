import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";
import useValidation from "../hooks/useValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const { values, errors, isValid, onChange, resetValidation } =
    useValidation();
  const inputRef = useRef("");

  React.useEffect(() => {
    resetValidation(values, errors);
  }, [isOpen, errors, values, resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Обновить аватар"
      name="updateAvatar"
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label>
        <input
          ref={inputRef}
          required
          type="url"
          placeholder="Ссылка на картинку"
          name="avatar"
          id="avatar"
          className="popup__input popup__input_type_avatar"
          onChange={onChange}
          value={values.avatar || ""}
        />
        <span className="popup__error" id="avatar-error">
          {errors.avatar || ""}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
