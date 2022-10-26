import React from "react";
import * as auth from "../../utils/auth";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
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
        if (data.token) {
          setEmail('');
          setPassword('');
          props.handleLogin(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
    </div>
  );
}
