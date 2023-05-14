import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked && "elements__like-button_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDelete() {
    onDeleteClick(card);
  }

  return (
    <li className="elements__item">
      <div
        className="elements__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="elements__trash"
          type="button"
          onClick={handleDelete}
        ></button>
      )}
      <div className="elements__bottom-block">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Мне нравится"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
