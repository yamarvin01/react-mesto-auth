export default function ButtonClose(props) {
  return (
    <button
      onClick={props.onClose}
      className="button button_type_close"
      type="button"
      aria-label="Закрыть"/>
  );
}
