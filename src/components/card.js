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

  const cardImage = cardElement.querySelector('.card__image');
  // наполняем содержимым 
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография места: ${card.name}`; 

  // удаляем при нажатии
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => deleteCard(cardElement)); 

  // лайкаем при нажатии
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => likeCard(likeButton));

  // подготавливаем попап
  cardImage.addEventListener('click', () => {
    clickImage(card);
  });

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
