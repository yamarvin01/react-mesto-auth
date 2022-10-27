import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

export default function AddPlacePopup(props) {
  const [name, setNameValue] = React.useState("");
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
      name: name,
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
      <label className="popup__field" htmlFor="place">
        <input
          value={name || ""}
          onChange={handleNameChange}
          className="popup__input popup__input_type_place"
          name="place"
          id="place"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="place-input-error popup__error"></span>
      </label>
      <label className="popup__field" htmlFor="link">
        <input
          value={linkValue || ""}
          onChange={handleLinkChange}
          className="popup__input popup__input_type_link"
          name="link"
          id="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="link-input-error popup__error"></span>
      </label>
    </PopupWithForm>
  );
}
