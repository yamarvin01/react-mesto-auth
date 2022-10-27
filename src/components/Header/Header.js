import React from "react";
import { Link } from "react-router-dom";
import logo from "../../styles/images/logo-mesto.svg";
import { useHistory } from "react-router-dom";
import { CurrentUserEmailContext } from "../../context/CurrentUserEmailContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function Header(props) {
  const history = useHistory();
  const currentUserEmail = React.useContext(CurrentUserEmailContext);
  const [pathName, setPathName] = React.useState(history.location.pathname);
  const [isEmailVisible, setIsEmailVisible] = React.useState(false);
  const { width } = useWindowDimensions();

  React.useEffect(() => {
    return history.listen((location) => {
      setPathName(location.pathname);
    });
  }, [history]);

  function handleClick() {
    setIsEmailVisible(true);
  }

  return (
    <>
    {width > 700 &&
      <header className="header">
        <a className="header__link" href="#" target="_blank" rel="noopener">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </a>
        <div className="header__content header__content_hidden">
          <p className="header__text">{currentUserEmail}</p>
          {pathName === "/sign-up" && (
            <Link className="header__link" to="/sign-in">Войти</Link>
          )}
          {pathName === "/sign-in" && (
            <Link className="header__link" to="/sign-up">Регистрация</Link>
          )}
          {pathName === "/" && (
            <Link className="header__link header__link_dim" to="sign-in" onClick={props.signOut}>Выйти</Link>
          )}
        </div>
      </header>
    }

    {width <= 700 && props.loggedIn &&
      <header className="header">
        <a className="header__link" href="#" target="_blank" rel="noopener">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </a>
        <img className="header__icon-group" onClick={handleClick} src={require(`../../styles/images/icon-group.png`)} />
      </header>
    }
    </>
  );
}
