import { deletePostedCard } from "../scripts/api";

// СОЗДАНИЕ КАРТОЧЕК

// клонируем содержимое тега template
const getTemplate = () => {
  return document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

//  функция создания карточки
export const createCard = (card, deleteCard, likeCard, clickImage, userId) => {
  const cardElement = getTemplate();

  const cardImage = cardElement.querySelector(".card__image");
  // наполняем содержимым
  cardElement.querySelector(".card__title").textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = `Фотография места: ${card.name}`;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  // удаляем при нажатии если пользовать подходит по айди
  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      deleteCard(cardElement, card._id)
    );
  } else {
    // убираем копку удалить если фотография выложена другим пользователем
    deleteButton.remove();
  }

  // отображаем количество поставленных лайков
  const likeCountElement = cardElement.querySelector(".card__like-count");
  likeCountElement.textContent = card.likes.length;

  const likeButton = cardElement.querySelector(".card__like-button");
  // если уже пролайкано до этого пользователем, то отображаем активный статус
  if (card.likes.includes(userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  // лайкаем при нажатии
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, card, likeCountElement, userId)
  );

  // подготавливаем попап
  cardImage.addEventListener("click", () => {
    clickImage(card);
  });

  // возвращаем готовую карточку
  return cardElement;
};

// УДАЛЕНИЕ КАРТОЧЕК

// функция-колбэк удаления карточек
export const deleteCard = (cardElement, cardId) => {
  // удаляем с сервера
  deletePostedCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

// СОБЫТИЯ ЛАЙКА

export const likeCard = (likeButton, card, likeCountElement, userId) => {
  // добавляем или убираем обозначение лайка
  likeButton.classList.toggle("card__like-button_is-active");
  // если поставлен лайк, то добавляем в список пройлайковших
  if (likeButton.classList.contains("card__like-button_is-active")) {
    card.likes.push(userId);
  } else {
    // убираем из списка если лайк убран
    card.likes = card.likes.filter((id) => id !== userId);
  }
  // отображаем новое количество лайков
  likeCountElement.textContent = card.likes.length;
};
