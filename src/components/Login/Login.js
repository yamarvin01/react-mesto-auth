import React from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Input from "../Input/Input";
import Form from "../Form/Form";

export default function Login() {
  const [login, setLogin] = React.useState('');
  const [email, setEmail] = React.useState('');

  function handleLoginChange(evt) {
    setLogin(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log({
      login: login,
      email: email
    });
  }

  return (
    <div className="login">
      <h2>Вход</h2>
      <Form onSubmit={handleSubmit}>
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
      </Form>
    </div>
  );
}
