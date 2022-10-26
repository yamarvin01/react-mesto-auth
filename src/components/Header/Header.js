import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";
import { useHistory } from "react-router-dom";
import { CurrentUserEmailContext } from "../../context/CurrentUserEmailContext";

export default function Header() {
  const history = useHistory();
  const currentUserEmail = React.useContext(CurrentUserEmailContext);
  const [pathName, setPathName] = React.useState(history.location.pathname);

  React.useEffect(() => {
    return history.listen((location) => {
      setPathName(location.pathname);
    });
  }, [history]);

  return (
    <header className="header">
      <a className="header__link" href="#" target="_blank" rel="noopener">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      </a>
      <div className="header__content">
        <p className="header__text">{currentUserEmail.toString()}</p>
        {pathName === "/sign-up" && (
          <Link className="header__link" to="/sign-in">Войти</Link>
        )}
        {pathName === "/sign-in" && (
          <Link className="header__link" to="/sign-up">Регистрация</Link>
        )}
        {pathName === "/" && (
          <Link className="header__link" to="/sign-in">Выйти</Link>
        )}
      </div>
    </header>
  );
}
