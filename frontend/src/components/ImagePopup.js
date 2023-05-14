import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_view-image ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <figure className="popup__figure">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card && card.link} alt={card.name} />
        <figcaption className="popup__image-text">
          {card && card.name}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
