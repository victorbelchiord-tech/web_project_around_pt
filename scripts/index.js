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

initialCards.forEach((card) => {
  console.log(`Gerando cartão para: ${card.name}`);
  console.log(`URL da imagem: ${card.link}`);
});

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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editButton.addEventListener("click", () => {
  openModal(editModal);
});

closeButton.addEventListener("click", () => {
  closeModal(editModal);
});

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", () => {
  closeModal(editModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeModal(editModal);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

function handleLikeIcon(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  const cardToBeDeleted = evt.target.closest(".card");
  cardToBeDeleted.remove();
}

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholders/placeholder.jpg",
) {
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

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardTitleInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsContainer);

  closeModal(addCardModal);

  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupCloseButton.addEventListener("click", () => {
  closeModal(imagePopup);
});
