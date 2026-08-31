import { Api } from "./Api.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { UserInfo } from "./UserInfo.js";

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
const avatarEditButton = document.querySelector(".profile__avatar-edit-button");

// --- Api ---
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "8bcf9143-2c4d-4041-a63e-1ee5d5979841",
    "Content-Type": "application/json",
  },
});

// --- UserInfo ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// --- PopupWithImage ---
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// --- PopupWithConfirmation (excluir cartão) ---
const confirmDeletePopup = new PopupWithConfirmation("#confirm-delete-popup");
confirmDeletePopup.setEventListeners();

function handleDeleteClick(card) {
  confirmDeletePopup.setSubmitAction(() => {
    confirmDeletePopup.renderLoading(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        confirmDeletePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => confirmDeletePopup.renderLoading(false));
  });
  confirmDeletePopup.open();
}

// --- Curtir / descurtir cartão ---
function handleLikeClick(card) {
  const willBeLiked = !card.isLiked();
  api
    .changeLikeCardStatus(card.getId(), willBeLiked)
    .then((updatedCard) => card.updateLikeStatus(updatedCard.isLiked))
    .catch((err) => console.log(err));
}

// --- Section ---
let cardSection;

function createCard(cardData, userId) {
  const card = new Card(
    cardData,
    cardTemplateSelector,
    { handleCardClick, handleLikeClick, handleDeleteClick },
    userId,
  );
  return card.generateCard();
}

// --- PopupWithForm: Editar Perfil ---
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  editProfilePopup.renderLoading(true);
  api
    .updateUserInfo({ name: formData.name, about: formData.description })
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about });
      editProfilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => editProfilePopup.renderLoading(false));
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

// --- PopupWithForm: Novo Cartão ---
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  newCardPopup.renderLoading(true, "Criando...");
  api
    .addCard({ name: formData["place-name"], link: formData.link })
    .then((cardData) => {
      cardSection.addItem(createCard(cardData, userInfo.getUserId()));
      newCardPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => newCardPopup.renderLoading(false, "Criar"));
});
newCardPopup.setEventListeners();

const newCardForm = document.querySelector("#new-card-form");
const addCardFormValidator = new FormValidator(validationConfig, newCardForm);
addCardFormValidator.setEventListeners();

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  newCardPopup.open();
});

// --- PopupWithForm: Atualizar Avatar ---
const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar(formData.avatar)
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopup.renderLoading(false));
});
avatarPopup.setEventListeners();

const avatarForm = document.querySelector("#avatar-form");
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);
avatarFormValidator.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  avatarFormValidator.resetValidation();
  avatarPopup.open();
});

// --- Carregamento inicial: usuário + cartões em paralelo ---
api
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserId(userData._id);
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setUserAvatar(userData.avatar);

    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          cardSection.addItem(createCard(cardData, userData._id));
        },
      },
      ".cards__list",
    );
    cardSection.renderItems();
  })
  .catch((err) => console.log(err));
