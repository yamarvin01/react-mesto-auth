import React from "react";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Input from "../Input/Input";
import Form from "../Form/Form";

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
      password: password
    });
  }

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <Form
        onSubmit={handleSubmit}
        name={"login"}
      >
        <Input
          onChange={handleEmailChange}
          value={email}
          name={"email"}
          type={"email"}
          placeholder={"Email"} />
        <Input
          onChange={handlePasswordChange}
          value={password}
          name={"password"}
          type={"password"}
          placeholder={"Пароль"}
        />
        <ButtonSubmit type="secondary">{"Войти"}</ButtonSubmit>
      </Form>
    </div>
  );
}
