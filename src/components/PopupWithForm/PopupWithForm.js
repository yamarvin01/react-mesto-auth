export default function PopupWithForm({
  name,
  title,
  btnText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <h2 className="popup__title">{title}</h2>
        <button
          onClick={onClose}
          className="button button_type_close"
          type="button"
          aria-label="Закрыть"
        ></button>
        <form
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          name={name}
        >
          {children}
          <button
            className="button button_type_submit"
            type="submit"
            aria-label="Сохранить"
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}
