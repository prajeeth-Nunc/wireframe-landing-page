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
let video = mainVideo.querySelector("video");
let PlayIcon = mainVideo.querySelector("i");
let controls = body.querySelector(".controls");
let volumeCtrl = body.querySelector(".ctrl-vol");
let Vidtimer = body.querySelector(".vid-timer");

localStorage.setItem("mainVidStatus", 0);

let currentTheme = localStorage.getItem("theme");
if (currentTheme) changeThemeColor(currentTheme);
else changeThemeColor("dodgerblue");

function changeThemeColor(color) {
  localStorage.setItem("theme", color);
  let iTag = mainVideo.querySelector("i");
  if (iTag) {
    iTag.style.cssText = "color: " + color;
  }
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
      let attr = {
        class: element.class,
        id: element.id,
        onclick: "changeThemeColor('" + element.bgcolor + "')",
      };
      setAttributes(aTag, attr);
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

function handleControlBar(flag) {
  controls.style.cssText =
    flag === 1 ? "bottom : 0px;display:block;" : "bottom : -40px;";
}

function PlayVid() {
  let playPause = document.querySelector(".ctrl-pause-play");
  let flag = parseInt(localStorage.getItem("mainVidStatus"));
  if (flag === 1) {
    localStorage.setItem("mainVidStatus", 0);
    PlayIcon.style.cssText = "visibility:visible; transition: all 0.2s;";
    video.pause();
    playPause.classList.remove("fa-pause");
    playPause.classList.add("fa-play");
    // console.log(playPause);
  } else {
    localStorage.setItem("mainVidStatus", 1);
    PlayIcon.style.cssText = "visibility:hidden; transition: all 0.2s;";
    video.play();
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
  }
}

volumeCtrl.addEventListener("click", ctrlVolume);

function ctrlVolume() {
  let currClasses = Array.from(volumeCtrl.classList);
  if (currClasses.includes("fa-volume-up")) {
    volumeCtrl.classList.remove("fa-volume-up");
    volumeCtrl.classList.add("fa-volume-mute");
    video.muted = true;
  } else if (currClasses.includes("fa-volume-mute")) {
    volumeCtrl.classList.remove("fa-volume-mute");
    volumeCtrl.classList.add("fa-volume-up");
    video.muted = false;
  }
}

function renderMainVideo(element) {
  if (video) {
  } else {
    video = document.createElement("video");
  }
  let attr = {
    id: element.id,
    src: element.Video,
    poster: element.Poster,
    width: "100%",
    onclick: "PlayVid()",
  };
  setAttributes(video, attr);
  attr = {
    onmouseover: "handleControlBar(1)",
    onmouseout: "handleControlBar(0)",
  };
  setAttributes(mainVideo, attr);
  mainVideo.insertBefore(video, mainVideo.childNodes[0]);

  PlayIcon.setAttribute("onclick", "PlayVid()");
  PlayIcon.style.cssText = "color: " + currentTheme;
  mainVTitle.textContent = element.Title;
  mainVDes.textContent = element.Description;
}

function renderCarouselImages(element, count, iTag, divTitle, divDes) {
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
  iTag.style.cssText = "color: " + currentTheme;
  divTitle.textContent = element.Title;

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
      posterContainer.innerHTML = "";
      let iTag = document.createElement("i");
      iTag.setAttribute("class", "fa fa-play-circle fa-2x play-btn pointer");
      let divTitle = document.createElement("div");
      divTitle.setAttribute("class", "vid-title my-3 theme");
      let divDes = document.createElement("div");
      divDes.setAttribute("class", "vid-des mb-3 text-secondary");
      let video = mainVideo.querySelector("video");

      if (video) {
        const videoId = video.id;
        let prevVID = data[videoId - 1];
        data.splice(id - 1, 0, prevVID);
        if (id - 1 < videoId) {
          data.splice(videoId, 1);
        } else {
          data.splice(videoId - 1, 1);
        }
        data.forEach((element) => {
          if (element.id === id) {
            renderMainVideo(element);
          } else {
            renderCarouselImages(element, count, iTag, divTitle, divDes);
          }
        });
      } else {
        let mainVID = data.filter((vid) => {
          return vid.id == id;
        });
        data.forEach((element) => {
          if (element.id === id) {
            renderMainVideo(mainVID[0]);
          } else {
            renderCarouselImages(element, count, iTag, divTitle, divDes);
          }
        });
      }
    });
}

videoRender();

// Form
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

// Carousel images

left.addEventListener("click", scrollRight);
right.addEventListener("click", scrollLeft);

function scrollRight() {
  posterContainer.scrollLeft -= 600;
}
function scrollLeft() {
  posterContainer.scrollLeft += 600;
}
