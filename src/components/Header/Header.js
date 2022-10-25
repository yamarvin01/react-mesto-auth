import { Link } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";
import { useRouteMatch } from "react-router-dom";

export default function Header() {
  const { url, path } = useRouteMatch();
  console.log("url: " + url, "path: " + path);

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
