import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";

export default function Login() {
  return (
    <>
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <ButtonSubmit className="button_white">{"Войти"}</ButtonSubmit>
      </form>
    </>
  );
}
