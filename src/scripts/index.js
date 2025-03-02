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

// СОЗДАЕМ КАРТОЧКИ

// находим место под карточки
const placesList = document.querySelector('.places__list');

// пройтись по всему списку и создать каждую из карточек
function createAllCards() {
  // удаляем изначально заложенные карточки
  placesList.innerHTML = "";
  initialCards.forEach((card) => {
    const createdCard = createCard(card, deleteCard, likeCard);
    // отображаем на странице
    placesList.append(createdCard);
  })
}
createAllCards();

// ОТКРЫВАЕМ ПОПАПЫ

// находим нужные кнопки и попапы в разметке для профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

// вызываем функцию открытия попапа при нажатии
editButton.addEventListener('click', () => { 
  // добавляем значения для формы при откртыии попапа
  nameInput.value = profileTitle.textContent; 
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
});

// находим нужные кнопки и попапы в разметке для карточек
const cardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');

// вызываем функцию
cardButton.addEventListener('click', () => { 
  // убираем предыдущие значения для формы при откртыии попапа
  placeInput.value = "";
  linkInput.value = "";
  openModal(cardPopup);
});

// находим нужные попап элементы для картинок в разметке
const photoPopup = document.querySelector('.popup_type_image');
const popupImage = photoPopup.querySelector('.popup__image');
const popupCaption = photoPopup.querySelector('.popup__caption');

// используем делегирование событий и выбираем список мест
document.querySelector('.places__list').addEventListener('click', (event) => {
    if (event.target.classList.contains('card__image')) {
        // в зависисмости от выбранной картинки, добавляем инфо о ней
        popupImage.src = event.target.src;
        popupImage.alt = event.target.alt;
        // находим текст и подписываем
        const card = event.target.closest('.card');
        popupCaption.textContent = card.querySelector('.card__title').textContent;
        // вызываем функцию
        openModal(photoPopup);
    }
});

// ЗАКРЫВАЕМ ПОПАПЫ

// находим нужные кнопки для закрытия
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach( (button) => {
    // находим нужный попап-родитель
    const popup = button.closest('.popup');
    // закрываем попап при нажатии на кнопку
    button.addEventListener('click', () => closeModal(popup));  
});

// закрываем попап нажатием на оверлэй
document.addEventListener('click', (event) => {
    if (event.target.matches('.popup')) {
        closeModal(event.target);
    }
});

// закрываем попап при нажатии на esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
});

// РЕДАКТИРУЕМ ПРОФИЛЬ

// находим форму в DOM
const formElement = editPopup.querySelector('.popup__form'); 
// находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name'); 
const jobInput = formElement.querySelector('.popup__input_type_description'); 

// выберем элементы, куда должны быть вставлены значения полей
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description');

// обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  // отменяем стандартную отправку формы
  evt.preventDefault(); 
  // получиим значение полей jobInput и nameInput из свойства value
  let jobName = jobInput.value;
  let personName = nameInput.value;
  // вставим новые значения
  profileTitle.textContent = personName;
  profileDescription.textContent  = jobName;
  closeModal(editPopup);
}

// прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit);

// ДОБАВЛЯЕМ КАРТОЧКИ

// находим форму в DOM
const cardFormElement = cardPopup.querySelector('.popup__form'); 
// находим поля формы в DOM
const placeInput = cardFormElement.querySelector('.popup__input_type_card-name'); 
const linkInput = cardFormElement.querySelector('.popup__input_type_url'); 

// обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleCardFormSubmit(evt) {
  // отменяем стандартную отправку формы
  evt.preventDefault(); 
  // получиим значение полей placeInput и linkInput из свойства value
  let placeName = placeInput.value;
  let linkName = linkInput.value;
  // добавляем значения в массив
  initialCards.unshift({
    name: placeName,
    link: linkName,
  });
  createAllCards()
  closeModal(cardPopup);
}

// прикрепляем обработчик к форме
cardFormElement.addEventListener('submit', handleCardFormSubmit);

// ОСТАВЛЯЕМ ЛАЙК

