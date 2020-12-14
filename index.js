let body = document.querySelector("body");
let navbar = document.querySelector(".navbar");
let navAtags = document.querySelectorAll(".navbar a");
let footer = document.querySelector("footer");
let submit = document.querySelector("input[type = submit]");
let themesContainer = document.querySelector(".theme-container");
let posterContainer = document.querySelector(".Poster-container");

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

// Video
fetch("videoInfo.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      let divFlexItem = document.createElement("div");
      if (parseInt(element.id) !== data.length) {
        divFlexItem.setAttribute("class", "mr-3");
      }
      let divPoster = document.createElement("div");
      divPoster.setAttribute("class", "poster");
      let img = document.createElement("img");
      img.setAttribute("src", element.Poster);
      img.setAttribute("class", "pointer");
      img.setAttribute("alt", element.Title);
      let iTag = document.createElement("i");
      iTag.setAttribute(
        "class",
        "fa fa-play-circle fa-2x play-btn pointer text-light"
      );
      let divTitle = document.createElement("div");
      divTitle.setAttribute("class", "main-vid-title my-3");
      divTitle.textContent = element.Title;
      let divDes = document.createElement("div");
      divDes.setAttribute("class", "main-vid-des mb-3 text-secondary");
      divDes.textContent = element.Description;
      divPoster.appendChild(img);
      divPoster.appendChild(iTag);
      divFlexItem.appendChild(divPoster);
      divFlexItem.appendChild(divTitle);
      divFlexItem.appendChild(divDes);
      posterContainer.appendChild(divFlexItem);
    });
  });
