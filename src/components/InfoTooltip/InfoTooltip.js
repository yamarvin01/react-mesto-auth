import React from "react";
import ButtonClose from "../ButtonClose/ButtonClose";
import Icon from "../Icon/Icon";

export default function InfoTooltip(props) {
  const [isOpened, setIsOpened] = React.useState(false);

  function handleClose() {
    setIsOpened(false);
  }

  return (
    <div className={
      isOpened
        ? "infoTooltip infoTooltip_opened"
        : "infoTooltip"}>
      <div className="infoTooltip__container">
        <Icon type={props.isSuccess ? "success" : "fail"}/>
        <h2 className="infoTooltip__title">{
          props.isSuccess
            ? "Вы успешно зарегистировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
          }
        </h2>
        <ButtonClose onClose={handleClose} />
      </div>
    </div>
  );
}
