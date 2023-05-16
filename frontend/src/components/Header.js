import React, { useState } from "react";
import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";

function HeaderForCurrentUser({ email, onSignOut, showMenu, setShowMenu }) {
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  if (window.innerWidth < 756 && email) {
    return (
      <div className="header__burger-container">
        {!showMenu && ( // проверяем, если меню закрыто, показываем кнопку
          <div className="header__right">
            <button className="header__burger" onClick={handleMenuClick}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        )}
        {showMenu && (
          <div className="header__mobile">
            <div className="header__button header__button_type_email header__button_type_email-open">
              {email}
            </div>
            <button
              onClick={onSignOut}
              className="header__button header__button_type_logout header__button_type_logout-open"
            >
              Выйти
            </button>
            <div className="header__mobile-container">
              <img className="header__logo" src={logo} alt="логотип Место" />
              <button
                className="header__button_type_close"
                type="button"
                onClick={handleMenuClick}
              ></button>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <>
        {email ? (
          <div className="header__right">
            <p className="header__button header__button_type_email">{email}</p>
            <button
              onClick={onSignOut}
              className="header__button header__button_type_logout"
            >
              Выйти
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </>
    );
  }
}

function navBar(loggedIn, email, onSignOut, showMenu, setShowMenu) {
  return (
    <Routes>
      <Route
        path="/sign-in"
        element={
          <Link to="/sign-up" className="header__button">
            Регистрация
          </Link>
        }
      />
      <Route
        path="/sign-up"
        element={
          <Link to="/sign-in" className="header__button">
            Войти
          </Link>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={HeaderForCurrentUser}
            loggedIn={loggedIn}
            email={email}
            onSignOut={onSignOut}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        }
      ></Route>
    </Routes>
  );
}

function Header({ loggedIn, onSignOut, email }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className="header page__header">
      {!showMenu && (
        <img className="header__logo" src={logo} alt="логотип Место" />
      )}
      {navBar(loggedIn, email, onSignOut, showMenu, setShowMenu)}
    </header>
  );
}

export default Header;
