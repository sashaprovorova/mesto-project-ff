// ИМПОРТИРУЕМ МОДУЛИ

import "../pages/index.css";
import { openModal, closeModal } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import {
  enableValidation,
  clearValidation,
  showInputError,
} from "./validity.js";

import {
  getUserInfo,
  getCardsInfo,
  updateUserInfo,
  postNewCard,
  updateUserAvatar,
  isImageUrlValid,
} from "./api.js";

// ПОДКЛЮЧАЕМ ЛОКАЛЬНЫЕ КАРТИНКИ

// import logo from '../images/logo.svg';
import avatar from "../images/avatar.jpg";

// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ

let userId = "";

// АНИМИРУЕМ ПОПАПЫ

document.querySelectorAll(".popup").forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

//  НА СЛУЧАЙ МЕДЛЕННОЙ ЗАГРУЗКИ

const renderLoading = (isLoading, buttonElement) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};

// ОТКРЫВАЕМ ПОПАПЫ

// находим нужные кнопки и попапы в разметке для профиля
const buttonOpenEditProfilePopup = document.querySelector(
  ".profile__edit-button"
);
const popupEditProfile = document.querySelector(".popup_type_edit");

// вызываем функцию открытия попапа при нажатии
buttonOpenEditProfilePopup.addEventListener("click", () => {
  // добавляем значения для формы при откртыии попапа
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

// находим нужные кнопки и попапы в разметке для карточек
const cardButton = document.querySelector(".profile__add-button");
const cardPopup = document.querySelector(".popup_type_new-card");

// вызываем функцию
cardButton.addEventListener("click", () => {
  // убираем предыдущие значения для формы при откртыии попапа
  cardFormElement.reset();
  clearValidation(cardPopup, validationConfig);
  openModal(cardPopup);
});

// находим нужные попап элементы для картинок в разметке
const photoPopup = document.querySelector(".popup_type_image");
const popupImage = photoPopup.querySelector(".popup__image");
const popupCaption = photoPopup.querySelector(".popup__caption");

const clickImage = (card) => {
  // в зависисмости от выбранной картинки, добавляем инфо о ней
  popupImage.src = card.link;
  popupImage.alt = `Фотография места: ${card.name}`;
  // подписываем название
  popupCaption.textContent = card.name;
  openModal(photoPopup);
};

// ЗАКРЫВАЕМ ПОПАПЫ

// находим нужные кнопки для закрытия
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  // находим нужный попап-родитель
  const popup = button.closest(".popup");
  // закрываем попап при нажатии на кнопку
  button.addEventListener("click", () => closeModal(popup));
});

// РЕДАКТИРУЕМ ПРОФИЛЬ

// находим форму в DOM
const formEditProfile = document.forms["edit-profile"];
// находим поля формы в DOM
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

// выберем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const submitProfile = formEditProfile.querySelector(".popup__button");

// новое имя и описание
// const newName = "Jack Sparrow";
// const newJob = "Captain of the Black Pearl, pirate";

const submitEditProfileForm = (evt) => {
  // отменяем стандартную отправку формы
  evt.preventDefault();

  renderLoading(true, submitProfile);
  // получаем значение полей jobInput и nameInput из свойства value
  const personName = nameInput.value;
  const jobName = jobInput.value;

  // вставим новые значения, отправив на сервер
  updateUserInfo(personName, jobName)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitProfile);
    });
};

// // прикрепляем обработчик к форме
formEditProfile.addEventListener("submit", submitEditProfileForm);

// СОЗДАЕМ КАРТОЧКИ

// находим место под карточки
const placesList = document.querySelector(".places__list");

// ДОБАВЛЯЕМ КАРТОЧКИ

// находим форму в DOM
const cardFormElement = cardPopup.querySelector(".popup__form");
// находим поля формы в DOM
const placeInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = cardFormElement.querySelector(".popup__input_type_url");
// находим кнопку
const submitCard = cardFormElement.querySelector(".popup__button");

const submitAddCardForm = (evt) => {
  // отменяем стандартную отправку формы
  evt.preventDefault();
  renderLoading(true, submitCard);
  // получиим значение полей placeInput и linkInput из свойства value
  const placeName = placeInput.value;
  const linkName = linkInput.value;

  // отправляем новую карточку на сервер
  postNewCard(placeName, linkName)
    .then((placeData) => {
      // создаем новую карточку
      const createdCard = createCard(
        placeData,
        deleteCard,
        likeCard,
        clickImage,
        userId
      );
      // добавляем в список и закрываем попап
      placesList.prepend(createdCard);
      closeModal(cardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, submitCard);
    });
};

// прикрепляем обработчик к форме
cardFormElement.addEventListener("submit", submitAddCardForm);

//  новое место и ссылка на него
// const newPlace = "Казань";
// const newLink =
//   "https://images.unsplash.com/photo-1628066068625-015ea7bcc21a?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2F6YW58ZW58MHx8MHx8fDA%3D";

// ПРОВЕРКА ФОРМ

// объект с классами для ДОМ
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// вызываем проверку всех форм
enableValidation(validationConfig);

// СОЗДАЕМ ЗАГРУЖЕННЫЕ С СЕРВЕРА КАРТОЧКИ

// пройдем по всему списку и создать каждую из карточек
const createAllCards = (cards, userId) => {
  // удаляем изначально заложенные карточки
  while (placesList.firstChild) {
    placesList.removeChild(placesList.firstChild);
  }
  // проходимся по всем имеющимся карточкам и создаем
  cards.forEach((card) => {
    const createdCard = createCard(
      card,
      deleteCard,
      likeCard,
      clickImage,
      userId
    );
    // отображаем на странице
    placesList.appendChild(createdCard);
  });
};

// ЗАПРАШИВАЕМ КАРТОЧКИ И САМОГО ПОЛЬЗОВАТЕЛЯ

// запрашиваем данные с сервера
Promise.all([getUserInfo(), getCardsInfo()])
  .then(([userData, cardData]) => {
    // сохраняем айди пользователя отдельно
    userId = userData._id;
    // отображаем всю остальную информацию о пользователе
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    // передаем полученные карточки для отрисовки
    createAllCards(cardData, userId);
  })
  .catch((err) => {
    console.log(err);
  });

//  МЕНЯЕМ АВАТАРКУ

// находим ДОМ элементы аватарки
const profileAvatar = document.querySelector(".profile__image");
profileAvatar.style.backgroundImage = `url(${avatar})`;
const editAvatar = document.querySelector(".profile__image-overlay");
const avatarPopup = document.querySelector(".popup_type_avatar");

// вызываем попап
editAvatar.addEventListener("click", () => {
  openModal(avatarPopup);
});

// const newAvatar =
//   "https://images.unsplash.com/photo-1606071548917-78ed9809141f?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BhcnJvd3xlbnwwfHwwfHx8MA%3D%3D";

// находим форму для смены аватара в DOM
const formEditAvatar = document.forms["edit-avatar"];
// находим поля формы в DOM
const avatarInput = formEditAvatar.querySelector(".popup__input_type_url");
const submitAvatar = formEditAvatar.querySelector(".popup__button");

// при отправке формы
formEditAvatar.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, submitAvatar);
  const newAvatar = avatarInput.value;
  // проверяем на валидность ссылки на именно на картинку
  isImageUrlValid(newAvatar)
    .then((isValid) => {
      if (isValid) {
        // меняем картинку
        updateUserAvatar(newAvatar)
          .then((userData) => {
            profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
            formEditAvatar.reset();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoading(false, submitAvatar);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      // если ссылка не на картинку, то показываем кастомную ошибку
      showInputError(
        formEditAvatar,
        avatarInput,
        avatarInput.dataset.errorMessage,
        validationConfig
      );
      formEditAvatar.reset();
      renderLoading(false, submitAvatar);
    });
});

//  ПОДТВЕРЖДЕНИЕ УДАЛЕНИЯ КАРТОЧКИ

let handleConfirm;
// находим элементы ДОМ
const confirmPopup = document.querySelector(".popup_type_confirmation");
const confirmForm = confirmPopup.querySelector(".popup__form");

export const openConfirmPopup = (deleteOnConfirm) => {
  // запоминаем переданную функцию
  handleConfirm = deleteOnConfirm;
  // открываем пока другой попап
  openModal(confirmPopup);
};

confirmForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  if (handleConfirm) {
    // вызываем сохраненную функцию удаления карточки
    handleConfirm();
    closeModal(confirmPopup);
  }
});
