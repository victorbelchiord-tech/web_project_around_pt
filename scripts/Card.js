export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeIcon(button) {
    button.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () =>
      this._handleLikeIcon(likeButton),
    );

    const deleteButton = this._element.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", () => this._handleDeleteCard());

    const cardImage = this._element.querySelector(".card__image");
    cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link),
    );
  }

  _fillCardData() {
    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardTitle.textContent = this._name;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._fillCardData();
    this._setEventListeners();

    return this._element;
  }
}
