import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import Input from "../Input/Input.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [nameValue, setNameValue] = React.useState(currentUser.name);
  const [aboutValue, setAboutValue] = React.useState(currentUser.about);

  React.useEffect(() => {
    setNameValue(currentUser.name);
    setAboutValue(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setNameValue(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAboutValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: nameValue,
      about: aboutValue
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name="editProfile"
      title="Редактировать профиль"
      btnText={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <Input
        value={nameValue}
        onChange={handleNameChange}
        name={"name"}
        type={"text"}
        placeholder={"Имя"}
        minLength={"2"}
        maxLength={"40"}
      />
      <Input
        value={aboutValue}
        onChange={handleAboutChange}
        name={"about"}
        type={"text"}
        placeholder={"О себе"}
        minLength={"2"}
        maxLength={"200"}
      />
    </PopupWithForm>
  );
}
