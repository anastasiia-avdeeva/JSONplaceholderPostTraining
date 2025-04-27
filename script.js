const API_URL = "https://jsonplaceholder.typicode.com/posts";
const ERROR_MSG = "Oops, something went wrong! Please, try again later.";

const postsContainer = document.querySelector(".posts");
const formElem = document.forms.newPost;
const titleInput = formElem.elements.postTitle;
// const titleInputError = document.getElementById("titleErr");
const bodyInput = formElem.elements.postBody;
// const bodyInputError = document.getElementById("bodyErr");
const allInputErrors = document.querySelectorAll(".form__error-msg");

const formValidity = {
  title: false,
  body: false,
};

formElem.addEventListener("blur", processInputChange, true);

function processInputChange(evt) {
  if (evt.target.tagName === "INPUT" || evt.target.tagName === "TEXTAREA") {
    const changedInput = evt.target;
    const changedInputGroup = evt.target.closest(".form__input-group");
    const errMsgElem = changedInputGroup.querySelector(".form__error-msg");
    toggleElemVisibility(errMsgElem, changedInput.value);
    updateFromValidity(changedInput, !!changedInput.value);
  }
}

function toggleElemVisibility(elem, visible) {
  visible ? (elem.style.display = "none") : (elem.style.display = "block");
}

function updateFromValidity(elem, isValid) {
  elem.name.includes("Title")
    ? (formValidity.title = isValid)
    : (formValidity.body = isValid);
}

formElem.addEventListener("submit", submitPost);

function renderErrorMsg() {
  const errorElem = createElemWithClass("p", "error-msg");
  errorElem.textContent = ERROR_MSG;
  postsContainer.append(errorElem);
}

function removeErrorMsg() {
  const erMsgElem = document.querySelector(".error-msg");
  if (erMsgElem) {
    erMsgElem.remove();
  }
}

function submitPost(evt) {
  evt.preventDefault();

  //   form.reset(); самое последнее
}

function createElemWithClass(tagname, classname) {
  const newElem = document.createElement(tagname);
  newElem.classList.add(classname);
  return newElem;
}

function resetFormValidity() {
  for (let key in formValidity) {
    formValidity[key] = false;
  }
}
