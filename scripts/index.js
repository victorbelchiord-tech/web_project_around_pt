import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

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

const cardTemplateSelector = "#card_template";
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

// --- UserInfo ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

// --- PopupWithImage ---
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// --- Section ---
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardTemplateSelector, handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);
cardSection.renderItems();

// --- PopupWithForm: Edit Profile ---
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.description,
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const editProfileForm = document.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(validationConfig, editProfileForm);
editFormValidator.setEventListeners();

editButton.addEventListener("click", () => {
  const currentUser = userInfo.getUserInfo();
  editProfileForm.querySelector(".popup__input_type_name").value =
    currentUser.name;
  editProfileForm.querySelector(".popup__input_type_description").value =
    currentUser.description;
  editFormValidator.resetValidation();
  editProfilePopup.open();
});

// --- PopupWithForm: New Card ---
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const card = new Card(
    { name: formData["place-name"], link: formData.link },
    cardTemplateSelector,
    handleCardClick,
  );
  cardSection.addItem(card.generateCard());
  newCardPopup.close();
});
newCardPopup.setEventListeners();

const newCardForm = document.querySelector("#new-card-form");
const addCardFormValidator = new FormValidator(validationConfig, newCardForm);
addCardFormValidator.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});
