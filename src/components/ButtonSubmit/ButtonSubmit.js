export default function ButtonSubmit(props) {
  return (
    <button
      className={
        (props.color === "white")
          ? "button button_type_submit button_white"
          : "button button_type_submit"
      }
      type="submit"
      aria-label="Сохранить"
    >
      {props.children}
    </button>
  );
}
