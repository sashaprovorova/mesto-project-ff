// ПРОВЕРКА ФОРМ

// добавляем класс с ошибкой
export const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(
    `.popup__error-${inputElement.id}`
  );
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// удаляем класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(
    `.popup__error-${inputElement.id}`
  );
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// проверяем валидность поля
export const checkInputValidity = (
  formElement,
  inputElement,
  validationConfig
) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    // показываем ошибку если не проходит валидацию
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    // убираем ошибку если проходит валидацию
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// проверяем если хотя бы одно из полей не валидно
export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// модифицируем кнопку в зависимости от состояния полей
export const toggleButtonState = (
  inputList,
  buttonElement,
  validationConfig
) => {
  if (hasInvalidInput(inputList)) {
    // делаем кнопку недоступной при ошибках
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    // делаем кнопку доступной при отсутствии ошибок
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const setEventListeners = (formElement, validationConfig) => {
  // находим все поля переданной формы
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  // проверяем состояние кнопки когда только открылся попап
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      // проверяем состояние кнопки при изменений полей
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// создаем проверку всех форм
export const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

// очищаем ошибки после закрытия попапа
export const clearValidation = (profileForm, validationConfig) => {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((inputElement) => {
    hideInputError(profileForm, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);
};
