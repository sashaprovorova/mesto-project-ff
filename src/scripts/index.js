// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

// ИМПОРТИРУЕМ МОДУЛИ

import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal, closeModal}  from '../components/modal.js';
import {createCard, deleteCard, likeCard}  from '../components/card.js';

// ПОДКЛЮЧАЕМ ЛОКАЛЬНЫЕ КАРТИНКИ 

// import logo from '../images/logo.svg';
import avatar from '../images/avatar.jpg';

// document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// ОТКРЫВАЕМ ПОПАПЫ

// находим нужные кнопки и попапы в разметке для профиля
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');

// вызываем функцию открытия попапа при нажатии
buttonOpenEditProfilePopup.addEventListener('click', () => { 
  // добавляем значения для формы при откртыии попапа
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;
  openModal(popupEditProfile);
});

// находим нужные кнопки и попапы в разметке для карточек
const cardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');

// вызываем функцию
cardButton.addEventListener('click', () => { 
  // убираем предыдущие значения для формы при откртыии попапа
  cardFormElement.reset();
  openModal(cardPopup);
});

// находим нужные попап элементы для картинок в разметке
const photoPopup = document.querySelector('.popup_type_image');
const popupImage = photoPopup.querySelector('.popup__image');
const popupCaption = photoPopup.querySelector('.popup__caption');

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
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach( (button) => {
    // находим нужный попап-родитель
    const popup = button.closest('.popup');
    // закрываем попап при нажатии на кнопку
    button.addEventListener('click', () => closeModal(popup));  
});

// СОЗДАЕМ КАРТОЧКИ

// находим место под карточки
const placesList = document.querySelector('.places__list');

// пройтись по всему списку и создать каждую из карточек
const createAllCards = () =>  {
  // удаляем изначально заложенные карточки
  placesList.innerHTML = "";
  initialCards.forEach((card) => {
    const createdCard = createCard(card, deleteCard, likeCard, clickImage);
    // отображаем на странице
    placesList.append(createdCard);
  })
}
createAllCards();

// РЕДАКТИРУЕМ ПРОФИЛЬ

// находим форму в DOM
const formEditProfile = document.forms['edit-profile'];
// находим поля формы в DOM
const nameInput = formEditProfile.querySelector('.popup__input_type_name'); 
const jobInput = formEditProfile.querySelector('.popup__input_type_description'); 

// выберем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description');


// обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const submitEditProfileForm = (evt) =>  {
  // отменяем стандартную отправку формы
  evt.preventDefault(); 
  // получиим значение полей jobInput и nameInput из свойства value
  const jobName = jobInput.value;
  const personName = nameInput.value;
  // вставим новые значения
  profileTitle.textContent = personName;
  profileDescription.textContent  = jobName;
  closeModal(popupEditProfile);
}

// прикрепляем обработчик к форме
formEditProfile.addEventListener('submit', submitEditProfileForm);

// ДОБАВЛЯЕМ КАРТОЧКИ

// находим форму в DOM
const cardFormElement = cardPopup.querySelector('.popup__form'); 
// находим поля формы в DOM
const placeInput = cardFormElement.querySelector('.popup__input_type_card-name'); 
const linkInput = cardFormElement.querySelector('.popup__input_type_url'); 

// обработчик «отправки» формы, хотя пока она никуда отправляться не будет
const submitAddCardForm = (evt) => {
  // отменяем стандартную отправку формы
  evt.preventDefault(); 
  // получиим значение полей placeInput и linkInput из свойства value
  const placeName = placeInput.value;
  const linkName = linkInput.value;

  const card = {
    name: placeName,
    link: linkName,
  }

  const addNewCard = createCard(card, deleteCard, likeCard, clickImage);
  placesList.prepend(addNewCard);
  closeModal(cardPopup);
}

// прикрепляем обработчик к форме
cardFormElement.addEventListener('submit', submitAddCardForm);
