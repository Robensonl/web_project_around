export class UserInfo {
 
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src
    };
  }

  setUserInfo(data) {
    if (data.name) this._nameElement.textContent = data.name;
    if (data.about) this._descriptionElement.textContent = data.about;
  }

  setUserAvatar(data) {
    if (data.avatar) this._avatarElement.src = data.avatar;
  }
}