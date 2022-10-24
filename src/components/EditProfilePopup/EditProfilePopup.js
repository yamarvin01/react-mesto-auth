import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import Input from "../Input/Input.js";
import { CurrentUserContext } from "../../context/CurrentUserContext.js";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [about, setAbout] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: about
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
        value={name}
        onChange={handleNameChange}
        name={"name"}
        type={"text"}
        placeholder={"Имя"}
        minLength={"2"}
        maxLength={"40"}
      />
      <Input
        value={about}
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
