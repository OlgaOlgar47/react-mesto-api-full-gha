import React from "react";

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
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
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
    </div>
  );
}

export default PopupWithForm;
