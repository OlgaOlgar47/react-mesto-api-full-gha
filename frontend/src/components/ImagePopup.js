import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup onClose={onClose} name="view-image" isOpen={Boolean(card.link)}>
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
    </Popup>
  );
}

export default ImagePopup;
