// openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

// СОЗДАНИЕ МОДАЛЬНОГО ОКНА 

// открываем попап 
export const openModal = (popupName) => {
    popupName.classList.add('popup_is-opened'); 
};

// УДАЛЕНИЕ МОДАЛЬНОГО ОКНА 

// удаляем попап 
export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
}

