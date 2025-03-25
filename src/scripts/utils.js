//  НА СЛУЧАЙ МЕДЛЕННОЙ ЗАГРУЗКИ

export const renderLoading = (isLoading, buttonElement) => {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
  } else {
    buttonElement.textContent = "Сохранить";
  }
};
