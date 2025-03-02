// openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

// СОЗДАНИЕ МОДАЛЬНОГО ОКНА 

// открываем попап 
export const openModal = (popupName) => {
  // не работает при первом нажатии тут
  // popupName.classList.add('popup_is-opened');
  // popupName.classList.remove('popup_is-animated');
  if (!popupName.classList.contains('popup_is-opened')) { 
    // добавляем, чтобы анимация сработала при первом нажатии
    popupName.classList.add('popup_is-animated'); 

    setTimeout(() => {
      popupName.classList.add('popup_is-opened'); 
      popupName.classList.remove('popup_is-animated');
    }, 10);
  }
};

// УДАЛЕНИЕ МОДАЛЬНОГО ОКНА 

// удаляем попап и анимируем
export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.classList.add('popup_is-animated');
}

