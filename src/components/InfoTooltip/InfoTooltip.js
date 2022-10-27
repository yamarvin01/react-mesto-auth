import React, { useRef } from "react";
import ButtonClose from "../ButtonClose/ButtonClose";
import Icon from "../Icon/Icon";

export default function InfoTooltip(props) {
  const [isOpen, setIsOpen] = React.useState(false);

  const dialogRef = React.useRef();

  function showModal() {
    dialogRef.current.showModal();
  }

  return (
    // <div className={props.isOpen ? `popup popup_opened` : `popup`}>
    //   <div className={`popup__container popup__container_type_tooltip`}>
    //     <Icon type={props.isSuccess ? "success" : "fail"}/>
    //     <h2 className="popup__title popup__title_type_tooltip">{props.isSuccess ? "Вы успешно зарегистировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
    //     <ButtonClose onClose={props.onClose} />
    //   </div>
    // </div>

    <>
      <dialog ref={dialogRef} open={isOpen} className="infoToolTip">
        <Icon type={props.isSuccess ? "success" : "fail"} />
        <p>Вы успешно зарагестрировались!</p>
      </dialog>

      <button onClick={showModal}>Click</button>
    </>
  );
}
