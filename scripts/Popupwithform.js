import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(
      this._form.querySelectorAll(".popup__input"),
    );
    this._submitButton = this._form.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  // Mostra "Salvando..." (ou outro texto) enquanto aguarda a resposta do servidor
  renderLoading(isLoading, loadingText = "Salvando...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._defaultButtonText;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
