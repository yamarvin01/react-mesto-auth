import React from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Input from "../Input/Input";

export default function Login() {
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleLoginChange(evt) {
    setLogin(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  return (
    <>
      <h2>Вход</h2>
      <form>
        <Input
          onChange={handleLoginChange}
          value={login}
          type={"email"}
          placeholder={"Email"} />
        <Input
          onChange={handleEmailChange}
          value={email}
          type={"password"}
          placeholder={"Пароль"}
        />
        <ButtonSubmit color="white">{"Войти"}</ButtonSubmit>
      </form>
    </>
  );
}
