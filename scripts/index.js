import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, handleOverlayClose } from "./utils.js";

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

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__description");
const nameInput = editModal.querySelector(".popup__input_type_name");
const jobInput = editModal.querySelector(".popup__input_type_description");
const editForm = editModal.querySelector(".popup__form");

const cardsContainer = document.querySelector(".cards__list");
const cardTemplateSelector = "#card_template";

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
const newCardForm = document.querySelector("#new-card-form");

const popups = document.querySelectorAll(".popup");

const editFormValidator = new FormValidator(validationConfig, editProfileForm);
editFormValidator.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, newCardForm);
addCardFormValidator.setEventListeners();

function handleOpenImagePopup(name, link) {
  popupCaption.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;
  openModal(imagePopup);
}

function renderCard(cardData, container) {
  const card = new Card(cardData, cardTemplateSelector, handleOpenImagePopup);
  const cardElement = card.generateCard();
  container.prepend(cardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsContainer);
});

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  editFormValidator.resetValidation();
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

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const newCardData = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(newCardData, cardsContainer);
  closeModal(addCardModal);
  addCardForm.reset();
}

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardForm.addEventListener("submit", handleCardFormSubmit);
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClose);
});
