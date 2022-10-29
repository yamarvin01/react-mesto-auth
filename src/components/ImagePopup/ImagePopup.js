export default function ImagePopup(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_dark popup_type_${props.name} popup_opened`
          : `popup popup_dark popup_type_${props.name}`
      }
    >
      <div className="popup__container popup__container_type_image">
        <button
          onClick={props.onClose}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
        <img
          className="popup__image"
          alt={`Изображение ${props.card.name}`}
          src={props.card.link}
        />
        <p className="popup__text">{props.card.name}</p>
      </div>
    </div>
  );
}
