import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirm({ card, isOpen, onClose, onCardDelete }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      className="popup__title_type_confirm"
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={true}
    ></PopupWithForm>
  );
}

export default PopupWithConfirm;
