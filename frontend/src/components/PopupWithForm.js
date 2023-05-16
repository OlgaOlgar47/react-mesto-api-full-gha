import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  isOpen,
  onClose,
  className,
  onSubmit,
  isValid,
}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose} />
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          <h2 className={`popup__title ${className}`}>{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__submit ${
              isValid ? "" : "popup__submit_inactive"
            }`}
            aria-label={title}
          >
            {buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
