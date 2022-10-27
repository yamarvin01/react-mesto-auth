import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { api } from "../utils/api";
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../context/CurrentUserContext";
import { CurrentUserEmailContext } from "../context/CurrentUserEmailContext";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup/DeleteCardPopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ImagePopup from "./ImagePopup/ImagePopup";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Main from "./Main/Main";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";

export default function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(true);
  const [isInfoToolTipSucceed, setIsInfoToolTipSucceed] = React.useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isDeleteCardPopupOpen;
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
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

  function handleLogin({loggedIn, email}) {
    setLoggedIn(loggedIn);
    setCurrentUserEmail(email);
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token).then((userData) => {
        if (userData) {
          setLoggedIn(true);
          setCurrentUserEmail(userData.data.email);
          history.push("/");
        } else {
          return;
        }
      });
    }
  }

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
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function signOut() {
    setLoggedIn(false);
    setCurrentUserEmail('');
    localStorage.removeItem('token');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmailContext.Provider value={currentUserEmail}>
        <div className="page">
          <Header
            signOut={signOut}
          />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-in">
              <div className="loginContainer">
                <Login handleLogin={handleLogin}/>
              </div>
            </Route>
            <Route path="/sign-up">
              <div className="registerContainer">
                <Register />
              </div>
            </Route>
          </Switch>
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
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={isInfoToolTipSucceed}
            onClose={closeAllPopups}
          />
        </div>
      </CurrentUserEmailContext.Provider>
    </CurrentUserContext.Provider>
  );
}
