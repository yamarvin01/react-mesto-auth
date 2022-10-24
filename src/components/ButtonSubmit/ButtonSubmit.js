export default function ButtonSubmit(props) {
  return (
    <button
      className="button button_type_submit"
      type="submit"
      aria-label="Сохранить"
    >
      {props.children}
    </button>
  );
}
