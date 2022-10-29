import React from "react";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginSuccess, setIsLoginSuccess] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const history = useHistory();

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.authorize(email, password)
      .then((data) => {
        if (data === undefined) {
          setIsLoginSuccess(false);
          setIsInfoTooltipOpened(true);
        } else if (data.token) {
          props.handleLogin({loggedIn: true, email: email});
          setEmail('');
          setPassword('');
          history.push('/');
        } else {
          console.log("Что-то пошло не так!");
        }
      });
  }

  function handleInfoTooltipClose() {
    setIsInfoTooltipOpened(false);
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit} name={"login"}>
        <label htmlFor="email">
          <input
            className="login__input"
            onChange={handleEmailChange}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            id="email"
            required
          />
          <span className="email-input-error popup__error"></span>
        </label>
        <label htmlFor="password">
          <input
            className="login__input"
            onChange={handlePasswordChange}
            value={password}
            name="password"
            type="password"
            placeholder="Пароль"
            id="password"
            required
          />
          <span className="password-input-error popup__error"></span>
        </label>
        <button
          className="login__button"
          type="submit"
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
      <InfoTooltip
        isOpened={isInfoTooltipOpened}
        isSuccess={isLoginSuccess}
        onClose={handleInfoTooltipClose}
      />
    </div>
  );
}
