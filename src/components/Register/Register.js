import React from "react";
import { Link } from "react-router-dom";
import * as auth from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

export default function Register() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.register(email, password)
      .then((registeredUserData) => {
        if (registeredUserData) {
          console.log(JSON.stringify(registeredUserData));
          console.log("Вы успешно зарегестрировались");
        } else {
          console.log("Что-то пошло не так!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          isOpen={isInfoTooltipOpen}
          isSuccess={isInfoToolTipSucceed}
          onClose={closeAllPopups}
        />
    </div>
  );
}
