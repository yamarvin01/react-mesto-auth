import "./Login.css";

export default function Login() {
  return (
    <>
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button className="login__button" type="submit">Войти</button>
      </form>
    </>
  );
}
