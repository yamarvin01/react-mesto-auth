import React from "react";
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
      <h2 className="register__title">Вход</h2>
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
        <ButtonSubmit color="white">{"Зарегестрироваться"}</ButtonSubmit>
      </Form>
    </div>
  );
}
