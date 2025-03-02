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
export const createCard = (card, deleteCard, likeCard) =>  {
  const cardElement = getTemplate();
  // наполняем содержимым 
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = `Фотография места: ${card.name}`; 

  // удаляем при нажатии
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement)); 

  // Лайкаем при нажатии
  // cardElement.querySelector('.card__like-button').addEventListener('click', () => likeCard(cardElement));
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

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
  // const likeButton = cardElement.querySelector('.card__like-button');
  // likeButton.classList.toggle('card__like-button_is-active');
  likeButton.classList.toggle('card__like-button_is-active');
}
