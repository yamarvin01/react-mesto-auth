import { Link } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";
import { useHistory } from "react-router-dom";
import React from "react";

export default function Header() {
  const history = useHistory();
  const [pathName, setPathName] = React.useState(history.location.pathname);

  function handleSignUpLink() {
    setPathName('/sign-in');
  }

  function handleSignInLink() {
    setPathName('/sign-up');
  }

  return (
    <header className="header">
      <a className="header__link" href="#" target="_blank" rel="noopener">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      </a>
      <div>
        { (pathName === "/sign-up") &&
        <Link onClick={handleSignUpLink} className="header__link" to="/sign-in">
          Войти
        </Link>
        }
        { (pathName === "/sign-in") &&
        <Link onClick={handleSignInLink} className="header__link" to="/sign-up">
          Регистрация
        </Link>
        }
      </div>
    </header>
  );
}
