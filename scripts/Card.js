export class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handleLikeClick, handleDeleteClick },
    userId,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _renderLikeStatus() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.classList.toggle("card__like-button_is-active", this._isLiked);
  }

  // Chamado pelo index.js depois que o servidor confirmar a curtida/descurtida
  updateLikeStatus(isLiked) {
    this._isLiked = isLiked;
    this._renderLikeStatus();
  }

  // Chamado pelo index.js depois que o servidor confirmar a exclusão
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like-button");
    likeButton.addEventListener("click", () => this._handleLikeClick(this));

    const deleteButton = this._element.querySelector(".card__delete-button");
    if (this._ownerId === this._userId) {
      deleteButton.addEventListener("click", () =>
        this._handleDeleteClick(this),
      );
    } else {
      deleteButton.remove();
    }

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
    this._renderLikeStatus();
    this._setEventListeners();

    return this._element;
  }
}
