import ButtonClose from "../ButtonClose/ButtonClose";
import Icon from "../Icon/Icon";

export default function InfoTooltip(props) {
  return (
    <div className={props.isOpen ? `popup popup_opened` : `popup`}>
      <div className={`popup__container popup__container_type_tooltip`}>
        <Icon type={props.isSuccess ? "success" : "fail"}/>
        <h2 className="popup__title popup__title_type_tooltip">{props.isSuccess ? "Вы успешно зарегистировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        <ButtonClose onClose={props.onClose} />
      </div>
    </div>
  );
}
