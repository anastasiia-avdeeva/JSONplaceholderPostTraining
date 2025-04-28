const API_URL = "https://jsonplaceholder.typicode.com/posts";
const ERROR_MSG = "Oops, something went wrong! Please, try again later.";

const formElem = document.forms.newPost;
const titleInput = formElem.elements.postTitle;
const bodyInput = formElem.elements.postBody;

const postsContainer = document.querySelector(".posts");
const postsLst = document.querySelector(".posts__lst");
const postsInfoElem = document.querySelector(".posts__info");
const btn = document.querySelector(".form__btn");

const formValidity = {
  title: false,
  body: false,
};

formElem.addEventListener("blur", processInputBlur, true);

function processInputBlur(evt) {
  if (evt.target.tagName === "INPUT" || evt.target.tagName === "TEXTAREA") {
    const changedInput = evt.target;
    const changedInputGroup = evt.target.closest(".form__input-group");
    const errMsgElem = changedInputGroup.querySelector(".form__error-msg");
    toggleElemVisibility(errMsgElem, changedInput.value);
    updateFromValidity(changedInput, !!changedInput.value);
    updateBtnState();
  }
}

function toggleElemVisibility(elem, hide) {
  hide ? (elem.style.display = "none") : (elem.style.display = "block");
}

function updateFromValidity(elem, isValid) {
  elem.name.includes("Title")
    ? (formValidity.title = isValid)
    : (formValidity.body = isValid);
}

function updateBtnState() {
  isFormValid()
    ? btn.removeAttribute("disabled")
    : btn.setAttribute("disabled", true);
}

function isFormValid() {
  return Object.values(formValidity).every(Boolean);
}

formElem.addEventListener("submit", handlePostSubmission);

async function handlePostSubmission(evt) {
  evt.preventDefault();
  const submitted = await submitToServer();
  renderPostsContent(submitted);
  resetFormValidity();
  formElem.reset();
}

async function submitToServer() {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: titleInput.value,
        body: bodyInput.value,
        userId: 1,
      }),
    });

    if (!response.ok) {
      console.log("Cannot fetch data form the server");
      throw new Error("HTTP Error: " + response.status);
    }

    const responseParsed = await response.json();
    console.log(responseParsed);
    return response.ok;
  } catch (error) {
    console.error("Error while loading from server", error);
    return false;
  }
}

function renderPostsContent(success) {
  hidePostsInfo();
  if (success) {
    removeErrorMsg();
    postsLst.append(createPostElem());
  } else {
    renderErrorMsg();
  }
}

function hidePostsInfo() {
  toggleElemVisibility(postsInfoElem, true);
}

function createPostElem() {
  const postElem = createElemWithClass("li", "post");
  postElem.innerHTML = `<h2 class="post__title">${capitalizeFirstLetter(
    titleInput.value
  )}</h2>
      <p class="post__body">${capitalizeFirstLetter(bodyInput.value)}</p>`;
  return postElem;
}

function createElemWithClass(tagname, classname) {
  const newElem = document.createElement(tagname);
  newElem.classList.add(classname);
  return newElem;
}

function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str[0].toUpperCase() + str.slice(1);
}

function renderErrorMsg() {
  if (!document.querySelector(".posts__error-msg")) {
    const errorElem = createElemWithClass("p", ".posts__error-msg");
    errorElem.textContent = ERROR_MSG;
    postsContainer.append(errorElem);
  }
}

function removeErrorMsg() {
  const erMsgElem = document.querySelector(".posts__error-msg");
  if (erMsgElem) {
    erMsgElem.remove();
  }
}

function resetFormValidity() {
  for (let key in formValidity) {
    formValidity[key] = false;
  }
}
