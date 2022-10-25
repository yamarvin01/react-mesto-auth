import React from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log({
      email: email,
      password: password,
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
          className="button button_type_submit button_type_secondary"
          type="submit"
          aria-label="Войти"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
