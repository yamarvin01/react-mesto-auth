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
        <img src="../../styles/images/icon-success.svg"></img>
        <img src="https://all-aforizmy.ru/wp-content/uploads/2022/03/moskva-dnr.jpg"></img>
        <h2 className="popup__title">Вы успешно зарегестировались!</h2>
        <ButtonClose onClose={props.onClose} />
      </div>
    </div>
  );
}
