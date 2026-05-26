const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");
const editForm = editModal.querySelector(".popup__form");
const cardsContainer = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card_template").content;
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector("#new-card-form");
const cardTitleInput = addCardForm.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const editProfileForm = document.querySelector("#edit-profile-form");
const nameInputEl = editProfileForm.querySelector("#profile-name-input");
const aboutInputEl = editProfileForm.querySelector("#profile-about-input");
const submitButtonEl = editProfileForm.querySelector(".popup__button");
const newCardForm = document.querySelector("#new-card-form");
const cardTitleInputEl = newCardForm.querySelector("#card-title-input");
const cardLinkInputEl = newCardForm.querySelector("#card-link-input");
const cardSubmitButtonEl = newCardForm.querySelector(".popup__button");
const popups = document.querySelectorAll(".popup");

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  hideInputError(editProfileForm, nameInputEl);
  hideInputError(editProfileForm, aboutInputEl);
  toggleButtonState(editProfileForm, submitButtonEl);
  openModal(editModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeModal(editModal);
}

editButton.addEventListener("click", handleOpenEditModal);
closeButton.addEventListener("click", () => closeModal(editModal));
editForm.addEventListener("submit", handleProfileFormSubmit);

function handleLikeIcon(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  const cardToBeDeleted = evt.target.closest(".card");
  cardToBeDeleted.remove();
}

function getCardElement(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", handleLikeIcon);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", handleDeleteCard);

  cardImage.addEventListener("click", () => {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsContainer);
  closeModal(addCardModal);
  addCardForm.reset();
}

addCardButton.addEventListener("click", () => {
  hideInputError(newCardForm, cardTitleInputEl);
  hideInputError(newCardForm, cardLinkInputEl);
  toggleButtonState(newCardForm, cardSubmitButtonEl);
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function toggleButtonState(formElement, buttonElement) {
  if (!formElement.checkValidity()) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
}

editProfileForm.addEventListener("input", (evt) => {
  checkInputValidity(editProfileForm, evt.target);
  toggleButtonState(editProfileForm, submitButtonEl);
});

newCardForm.addEventListener("input", (evt) => {
  checkInputValidity(newCardForm, evt.target);
  toggleButtonState(newCardForm, cardSubmitButtonEl);
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});
