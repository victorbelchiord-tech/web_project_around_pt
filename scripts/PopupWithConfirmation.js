import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._submitButton = this._popup.querySelector(".popup__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  // Permite trocar qual cartão será excluído antes de abrir o pop-up
  setSubmitAction(callback) {
    this._handleConfirm = callback;
  }

  renderLoading(isLoading) {
    this._submitButton.textContent = isLoading
      ? "Excluindo..."
      : this._defaultButtonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });
  }
}
