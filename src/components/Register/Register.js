import React from "react";
import { Link } from "react-router-dom";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = React.useState(false);
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
    auth.register(email, password)
      .then((userData) => {
        if (userData) {
          setIsInfoTooltipOpened(true);
          setIsRegisterSuccess(true);
        } else {
          setIsInfoTooltipOpened(true);
          setIsRegisterSuccess(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleInfoTooltipClose() {
    if (isRegisterSuccess) {
      history.push("/sign-in");
    } else {
      setIsInfoTooltipOpened(false);
    }
  }

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" onSubmit={handleSubmit} name={"register"}>
        <label htmlFor="email">
          <input
            className="register__input"
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
            className="register__input"
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
          className="register__button"
          type="submit"
          aria-label="Зарегистрироваться"
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__hint">
        <Link className="register__hint-title" to="/sign-in" >Уже зарегистрированы? Войти</Link>
      </div>
      <InfoTooltip
        isOpened={isInfoTooltipOpened}
        isSuccess={isRegisterSuccess}
        onClose={handleInfoTooltipClose}
      />
    </div>
  );
}
