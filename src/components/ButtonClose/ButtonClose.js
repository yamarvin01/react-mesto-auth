export default function ButtonClose(props) {
  return (
    <button
      onClick={props.onClose}
      className="popup__button popup__button_type_close"
      type="button"
      aria-label="Закрыть"/>
  );
}
