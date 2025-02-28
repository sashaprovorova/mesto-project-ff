// openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

// СОЗДАНИЕ МОДАЛЬНОГО ОКНА 

// открываем попап 
export const openModal = (popupName) => {
    popupName.classList.add('popup_is-opened'); 
};

// находим нужные кнопки и попапы в разметке для профиля
const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');

// вызываем функцию открытия попапа при нажатии
editButton.addEventListener('click', () => { 
    openModal(editPopup);
});

// находим нужные кнопки и попапы в разметке для карточек
const cardButton = document.querySelector('.profile__add-button');
const cardPopup = document.querySelector('.popup_type_new-card');

// вызываем функцию
cardButton.addEventListener('click', () => { 
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

// УДАЛЕНИЕ МОДАЛЬНОГО ОКНА 

// удаляем попап 
export const closeModal = (popup) => {
    popup.classList.remove('popup_is-opened');
}

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
