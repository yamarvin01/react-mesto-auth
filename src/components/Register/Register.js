import React from "react";
import { Link } from "react-router-dom";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import Input from "../Input/Input";
import Form from "../Form/Form";

export default function Register() {
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
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <Form
        onSubmit={handleSubmit}
        name={"register"}
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
        <ButtonSubmit color="white">{"Зарегистрироваться"}</ButtonSubmit>
        <Link className="register__hint" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </Form>
    </div>
  );
}
