let body = document.querySelector("body");
let navbar = document.querySelector(".navbar");
let navAtags = document.querySelectorAll(".navbar a");
let footer = document.querySelector("footer");
let submit = document.querySelector("input[type = submit]");
let themesContainer = document.querySelector(".theme-container");

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
    console.log(data);
  });
