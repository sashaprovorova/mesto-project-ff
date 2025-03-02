// Функции для работы с карточками проекта Mesto вынесите в файл card.js, из него должна экспортироваться функция createCard, которую вы создали раньше (у вас она может называться по-другому). Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.

// СОЗДАНИЕ КАРТОЧЕК

// клонируем содержимое тега template
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

//  функция создания карточки
export const createCard = (card, deleteCard, likeCard, clickImage) =>  {
  const cardElement = getTemplate();
  // наполняем содержимым 
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `Фотография места: ${card.name}`; 

  // удаляем при нажатии
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement)); 

  // лайкаем при нажатии
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

  // подготавливаем попап
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => clickImage(card));

  // возвращаем готовую карточку
  return cardElement;
}

// УДАЛЕНИЕ КАРТОЧЕК

// функция-колбэк удаления карточек
export const deleteCard = (cardElement) => {
  cardElement.remove();
}

// СОБЫТИЯ ЛАЙКА

export const likeCard = (likeButton) => {
  likeButton.classList.toggle('card__like-button_is-active');
}

// ПОПАП КАРТОЧКИ

const photoPopup = document.querySelector('.popup_type_image');
const popupImage = photoPopup.querySelector('.popup__image');
const popupCaption = photoPopup.querySelector('.popup__caption');

export const clickImage = (card) => {
  // в зависисмости от выбранной картинки, добавляем инфо о ней
  popupImage.src = card.link;
  popupImage.alt = `Фотография места: ${card.name}`;
  // подписываем название
  popupCaption.textContent = card.name;
};
