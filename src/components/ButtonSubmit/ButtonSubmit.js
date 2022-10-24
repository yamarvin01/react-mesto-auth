export default function ButtonSubmit(props) {
  return (
    <button
      className="popup__button popup__button_type_submit"
      type="submit"
      aria-label="Сохранить"
    >
      {props.children}
    </button>
  );
}
