import ButtonClose from "../ButtonClose/ButtonClose";

export default function InfoTooltip(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_opened`
          : `popup`
      }
    >
      <div className={`popup__container`}>
        <img className="icon icon_type_success"></img>
        <img className="icon icon_type_fail"></img>
        <h2 className="popup__title">Вы успешно зарегестировались!</h2>
        <h2 className="popup__title">Что-то пошло не так! Попробуйте ещё раз.</h2>
        <ButtonClose onClose={props.onClose} />
      </div>
    </div>
  );
}
