// находим место под карточки
const placesList = document.querySelector('.places__list');

// клонируем содержимое тега template
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

//  функция создания карточки
const createCard = (card, deleteCard) =>  {
  const cardElement = getTemplate();
  // наполняем содержимым 
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `Фотография места: ${card.name}`; 

  // удаляем при нажатии
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement)); 
  // возвращаем готовую карточку
  return cardElement;
}

// функция-колбэк удаления карточек
const deleteCard = (cardElement) => {
  cardElement.remove();
}

// пройтись по всему списку и создать каждую из карточек
initialCards.forEach((card) => {
  const createdCard = createCard(card, deleteCard);
  // отображаем на странице
  placesList.append(createdCard);
})
