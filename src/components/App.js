import { api } from "../utils/api.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";
import DeleteCardPopup from "./DeleteCardPopup/DeleteCardPopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import Footer from "./Footer/Footer.js";
import Header from "./Header/Header.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import Main from "./Main/Main.js";
import React from "react";

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isDeleteCardPopupOpen;

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === "Escape") {
        closeAllPopups();
      }
    }
    function closeByClick(evt) {
      if(evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keyup', closeByEscape);
      document.addEventListener('mouseup', closeByClick);
      return () => {
        document.removeEventListener('keyup', closeByEscape);
        document.removeEventListener('mouseup', closeByClick);
      }
    }
  }, [isOpen]);

  function handleUpdateAvatar(newAvatar) {
    setIsLoading(true);
    api.editProfileAvatar(newAvatar.avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true);
    api.editProfile(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardDeleteSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCard._id)
      .then(() => {
        setCards(state => state.filter(card => card._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCardData) {
    setIsLoading(true);
    api.addNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" name="page"
      >
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        ></EditAvatarPopup>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        ></EditProfilePopup>
        <AddPlacePopup
          onAddCard={handleAddPlaceSubmit}
          isLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
        </AddPlacePopup>
        <DeleteCardPopup
          onDeleteCard={handleCardDeleteSubmit}
          isLoading={isLoading}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
        >
        </DeleteCardPopup>
        <ImagePopup
          name="image"
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
