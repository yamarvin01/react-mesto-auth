import React from "react";
import { Link } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  const [pathName, setPathName] = React.useState(history.location.pathname);

  React.useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`);
      setPathName(location.pathname);
    });
  }, [history]);

  return (
    <header className="header">
      <a className="header__link" href="#" target="_blank" rel="noopener">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
      </a>
      <div>
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
