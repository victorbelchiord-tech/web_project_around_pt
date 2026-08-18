export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // O servidor usa "name" e "about"; internamente mantemos "description"
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
