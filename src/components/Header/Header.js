import React from "react";
import { Link } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a className="header__link" href="#" target="_blank" rel="noopener">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </a>
        <div>
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        </div>
      </header>
    );
  }
}
