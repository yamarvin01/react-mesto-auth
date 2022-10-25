export default function ButtonSubmit(props) {
  return (
    <button
      className={
        (props.type === "secondary")
          ? "button button_type_submit button_type_secondary"
          : "button button_type_submit"
      }
      type="submit"
      aria-label="Сохранить"
    >
      {props.children}
    </button>
  );
}
