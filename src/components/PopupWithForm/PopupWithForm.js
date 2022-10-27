import ButtonClose from "../ButtonClose/ButtonClose.js";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit.js";

export default function PopupWithForm({name, title, btnText, children, isOpen, onClose, onSubmit}) {
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
        <ButtonClose onClose={onClose} />
        <form
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          name={name}
        >
          {children}
          <ButtonSubmit>{btnText}</ButtonSubmit>
        </form>
      </div>
    </div>
  );
}
