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
    setIsEmailVisible(!isEmailVisible);
  }

  function handleSignOut() {
    props.signOut();
    setIsEmailVisible(false);
  }

  return (
    <>
    {(width > 700 || (width < 700 && !props.loggedIn)) &&
      <header className="header">
        <Link className="header__link" to="/">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </Link>
        <div className="header__content">
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

    {width <= 700 && props.loggedIn && isEmailVisible &&
      <div className="header__mobile">
        <p className="header__mobile-text">{currentUserEmail}</p>
        <Link
          to="sign-in"
          onClick={handleSignOut}
          className="header__mobile-link"
        >
          Выйти
        </Link>
      </div>
    }

    {width <= 700 && props.loggedIn &&
      <header className="header">
        <a className="header__link" href="#" target="_blank" rel="noopener">
          <img className="header__logo" src={logo} alt="Логотип Mesto Russia" />
        </a>
        <img
          className={isEmailVisible ? "header__icon-close" : "header__icon-group"}
          src={isEmailVisible ? require(`../../styles/images/btn-close.png`) : require(`../../styles/images/icon-group.png`)}
          onClick={handleClick} />
      </header>
    }
    </>
  );
}
