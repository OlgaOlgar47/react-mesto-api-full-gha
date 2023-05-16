import { useContext } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteClick,
  onCardLike,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content page__content">
        <section className="profile content__profile">
          <div className="profile__card">
            <button
              className="profile__editAvatar-button"
              type="button"
              aria-label="Изменить аватар"
              onClick={onEditAvatar}
            >
              <div
                className="profile__avatar"
                alt="Аватарка"
                style={{ backgroundImage: `url(${currentUser?.avatar})` }}
              />
            </button>
            <div className="profile__profile-info">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактирование данных"
                onClick={onEditProfile}
              ></button>
              <p className="profile__profession">{currentUser?.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить картинку"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements" aria-label="Сетка фотографий">
          <ul className="elements__list">
            {cards.map((card) => {
              return (
                <Card
                  key={card._id}
                  card={card}
                  name={card.name}
                  link={card.link}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onDeleteClick={onDeleteClick}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copyright">&copy;&nbsp;2023 Mesto Russia</p>
      </footer>
    </>
  );
}

export default Main;
