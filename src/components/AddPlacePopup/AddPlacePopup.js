import React from "react";
import Input from "../Input/Input.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

export default function AddPlacePopup(props) {
  const [nameValue, setNameValue] = React.useState("");
  const [linkValue, setLinkValue] = React.useState("");

  React.useEffect(() => {
    setNameValue("");
    setLinkValue("");
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setNameValue(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLinkValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      name: nameValue,
      link: linkValue,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="addPlace"
      title="Новое место"
      btnText={props.isLoading ? "Сохранение..." : "Создать"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Input
        value={nameValue}
        onChange={handleNameChange}
        name={"place"}
        type={"text"}
        placeholder={"Название"}
        minLength="2"
        maxLength="30"
      />
      <Input
        value={linkValue}
        onChange={handleLinkChange}
        name={"link"}
        type={"url"}
        placeholder={"Ссылка на картинку"}
      />
    </PopupWithForm>
  );
}
