let body = document.querySelector("body");
let navbar = body.querySelector(".navbar");
let navAtags = body.querySelectorAll(".navbar a");
let footer = body.querySelector("footer");
let submit = body.querySelector("input[type = submit]");
let themeItems = body.querySelectorAll(".theme");
let themesContainer = body.querySelector(".theme-container");
let posterContainer = body.querySelector(".Poster-container");
let form = body.querySelector("form");
let validators = ["", null, undefined];
let mainVideo = body.querySelector(".main-video");
let mainVTitle = body.querySelector(".main-vid-title");
let mainVDes = body.querySelector(".main-vid-des");
let left = body.querySelector(".carousel-ctrls .left");
let right = body.querySelector(".carousel-ctrls .right");

let currentTheme = localStorage.getItem("theme");
if (currentTheme) changeThemeColor(currentTheme);
else changeThemeColor("#6c757d");

function changeThemeColor(color) {
  localStorage.setItem("theme", color);
  let defaultStyle = "background: " + color + "; color : white;";
  navbar.style.cssText = defaultStyle;
  footer.style.cssText = defaultStyle;
  submit.style.cssText = defaultStyle;
  navAtags.forEach((a) => {
    a.style.cssText = "color : white";
  });
  themeItems.forEach((item) => {
    item.style.color = color;
  });
}

// Themes
fetch("themes.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      aTag = document.createElement("a");
      aTag.setAttribute("class", element.class);
      aTag.setAttribute("id", element.id);
      aTag.setAttribute(
        "onclick",
        "changeThemeColor('" + element.bgcolor + "')"
      );
      aTag.style.cssText =
        "width: 20px;height: 20px;background: " + element.bgcolor;
      themesContainer.appendChild(aTag);
    });
  });

function setAttributes(tag, attrbs) {
  for (let prop in attrbs) {
    tag.setAttribute(prop, attrbs[prop]);
  }
}

function renderMainVideo(element) {
  let video = mainVideo.querySelector("video");
  console.log(video);
  if (video) {
  } else {
    video = document.createElement("video");
  }
  let attr = {
    src: element.Video,
    poster: element.Poster,
    width: "100%",
    height: "auto",
  };
  setAttributes(video, attr);
  mainVideo.insertBefore(video, mainVideo.childNodes[0]);
  // mainVideo.appendChild(video);
  let iTag = mainVideo.querySelector("i");
  if(iTag){
  }else{
    let iTag = document.createElement("i");
    iTag.setAttribute(
      "class",
      "fa fa-play-circle fa-4x play-btn pointer text-light"
    );
    mainVideo.appendChild(iTag);
  }
  mainVTitle.textContent = element.Title;
  mainVDes.textContent = element.Description;
}

function renderCarouselImages(element, count) {
  let divFlexItem = document.createElement("div");
  if (parseInt(element.id) !== count) {
    divFlexItem.setAttribute("class", "mr-3");
  }
  let divPoster = document.createElement("div");
  divPoster.setAttribute("class", "poster");
  let img = document.createElement("img");
  let attr = {
    src: element.Poster,
    class: "pointer",
    alt: element.Title,
    onclick: "videoRender(" + element.id + ")",
  };

  setAttributes(img, attr);
  let iTag = document.createElement("i");
  iTag.setAttribute(
    "class",
    "fa fa-play-circle fa-2x play-btn pointer text-info"
  );
  let divTitle = document.createElement("div");
  divTitle.setAttribute("class", "vid-title my-3 theme");
  divTitle.textContent = element.Title;
  let divDes = document.createElement("div");
  divDes.setAttribute("class", "vid-des mb-3 text-secondary");
  divDes.textContent = element.Description;
  divPoster.innerHTML += img.outerHTML + iTag.outerHTML;
  divFlexItem.innerHTML +=
    divPoster.outerHTML + divTitle.outerHTML + divDes.outerHTML;
  posterContainer.appendChild(divFlexItem);
}

// Video
function videoRender(id = null) {
  fetch("videoInfo.json")
    .then((res) => res.json())
    .then((data) => {
      let count = data.lenth;
      id = id === null ? 1 : id;
      posterContainer.innerHTML = ""
      data.forEach((element) => {
        if (element.id === id) {
          renderMainVideo(element);
        } else {
          renderCarouselImages(element, count);
        }
      });
    });
}

videoRender();

const exceptionMsg = {
  firstname: "Please Enter First Name",
  lastname: "Please Enter Last Name",
  email: "Please Enter Email Address",
  phno: "Please Enter Phone Number",
};

form.addEventListener("submit", validate);

function validate(e) {
  e.preventDefault();
  let expMsgs = document.querySelectorAll(".form-group small");
  expMsgs.forEach((element) => {
    element.textContent = "";
  });

  let small = document.createElement("small");
  small.setAttribute("class", "text-danger");

  let firstnameInp = form.querySelector("#firstname");
  let lastnameInp = form.querySelector("#lastname");
  let emailInp = form.querySelector("#email");
  let phoneInp = form.querySelector("#phone");
  let commentsInp = form.querySelector("#comments");

  let fstname = firstnameInp.value;
  let lstname = lastnameInp.value;
  let email = emailInp.value;
  let phno = phoneInp.value;
  let cmts = commentsInp.value;

  if (validators.includes(fstname)) {
    formgroup = firstnameInp.parentElement;
    small.textContent = exceptionMsg.firstname;
    formgroup.appendChild(small);
  } else if (validators.includes(lstname)) {
    formgroup = lastnameInp.parentElement;
    small.textContent = exceptionMsg.lastname;
    formgroup.appendChild(small);
  } else if (validators.includes(email)) {
    formgroup = emailInp.parentElement;
    small.textContent = exceptionMsg.email;
    formgroup.appendChild(small);
  } else if (validators.includes(phno)) {
    formgroup = phoneInp.parentElement;
    small.textContent = exceptionMsg.phno;
    formgroup.appendChild(small);
  } else {
    console.log("Submit form");
  }
}

left.addEventListener("click", scrollRight);
right.addEventListener("click", scrollLeft);

function scrollRight() {
  posterContainer.scrollLeft -= 600;
}
function scrollLeft() {
  posterContainer.scrollLeft += 600;
}
