// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА

// закрываем попап нажатием на оверлэй
const closeByOverlay = (event) => {
  if (event.target.matches(".popup")) {
    closeModal(event.target);
  }
};

// закрываем попап при нажатии на esc
const closeByEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

// СОЗДАНИЕ МОДАЛЬНОГО ОКНА

// открываем попап
export const openModal = (popupName) => {
  popupName.classList.add("popup_is-opened");

  popupName.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEsc);
};

// УДАЛЕНИЕ МОДАЛЬНОГО ОКНА

// удаляем попап
export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");

  popup.removeEventListener("click", closeByOverlay);
  document.removeEventListener("keydown", closeByEsc);
};
