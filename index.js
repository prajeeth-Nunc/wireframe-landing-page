let body = document.querySelector("body");
let navbar = body.querySelector(".navbar");
let navAtags = body.querySelectorAll(".navbar a");
let navLinks = body.querySelectorAll(".nav-link");
let footer = body.querySelector("footer");
let submit = body.querySelector("input[type = submit]");
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
let PlayIcon = mainVideo.querySelector("i.fa-play-circle");
let controls = body.querySelector(".controls");
let volumeCtrl = body.querySelector(".ctrl-vol");
let ScreenCtrl = body.querySelector(".ctrl-fscreen");
let currentTime = body.querySelector(".cur-time");
let vidDuration = body.querySelector(".duration");
let progress = body.querySelector(".progress");
let progressBar = body.querySelector(".progress-bar");
let playPause = document.querySelector(".ctrl-pause-play");
let playBack = body.querySelector("#playbackspeed");
let videoLoop = body.querySelector(".ctrl-vidloop");
let navbarItems = body.querySelector("#navbar-items");

localStorage.setItem("mainVidStatus", 0);

let currentTheme = localStorage.getItem("theme");
if (currentTheme) changeThemeColor(currentTheme);
else changeThemeColor("#86C232");

function changeThemeColor(color) {
  let themeItems = body.querySelectorAll(".theme");
  let bgThemeItems = body.querySelectorAll(".bg-theme");
  localStorage.setItem("theme", color);
  let defaultStyle = "background: " + color + "; color : white;";
  navAtags.forEach((a) => {
    a.style.cssText = "color : white";
  });
  themeItems.forEach((item) => {
    item.style.color = color;
  });
  bgThemeItems.forEach((item) => {
    item.style.cssText = defaultStyle;
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

function handleNavInMob() {
  let currClasses = Array.from(navbarItems.classList);
  if (currClasses.includes("collapse")) {
    navbarItems.classList.remove("collapse");
  } else {
    navbarItems.classList.add("collapse");
  }
}

navLinks.forEach((link) => {
  let attr = {
    onclick: "setNavLinkActive(this)",
  };
  setAttributes(link, attr);
});

function setNavLinkActive(link) {
  navLinks.forEach((navlink) => {
    navlink.classList.remove("active");
  });
  link.classList.add("active");
}

function setAttributes(tag, attrbs) {
  for (let prop in attrbs) {
    tag.setAttribute(prop, attrbs[prop]);
  }
}

function handleControlBar(flag) {
  controls.style.cssText =
    flag === 1 ? "bottom : 0px;display:block;" : "bottom : -40px;";
}

function getTime(time) {
  let minutes = parseInt(Math.round(time) / 60, 10);
  let seconds = Math.round(time % 60).toString();
  seconds =
    seconds.length === 1 ? "0" + seconds : seconds === 60 ? "00" : seconds;
  return minutes + ":" + seconds;
}

function handleProgress() {
  setInterval(() => {
    currentTime.textContent = getTime(video.currentTime);
    progress.style.width =
      Math.round((video.currentTime / video.duration) * 100) + "%";
  }, 1000);
}

progressBar.addEventListener("click", handlePlayFrmHere);

function handlePlayFrmHere(e) {
  let position = Math.round((e.offsetX / progressBar.clientWidth) * 100);
  console.log(position);
  video.currentTime = (video.duration * position) / 100;
  progress.style.width = position + "%";
}

function PlayVid() {
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

ScreenCtrl.addEventListener("click", handleFullScreenVid);

function handleFullScreenVid() {
  let currClasses = Array.from(ScreenCtrl.classList);
  if (currClasses.includes("fa-expand")) {
    if (mainVideo.requestFullscreen) {
      mainVideo.requestFullscreen();
    } else if (mainVideo.webkitRequestFullscreen) {
      mainVideo.webkitRequestFullscreen();
    } else if (mainVideo.msRequestFullscreen) {
      mainVideo.msRequestFullscreen();
    }
    ScreenCtrl.classList.remove("fa-expand");
    ScreenCtrl.classList.add("fa-compress");
  } else if (currClasses.includes("fa-compress")) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    ScreenCtrl.classList.remove("fa-compress");
    ScreenCtrl.classList.add("fa-expand");
  }
}

function handleVidFinish() {
  console.log("video finished");
  playPause.classList.remove("fa-pause");
  playPause.classList.add("fa-play");
  localStorage.setItem("mainVidStatus", 0);
}

document.addEventListener("keydown", handleKeypressEvents);

function handleKeypressEvents(e) {
  switch (e.keyCode) {
    case 37:
      video.currentTime -= 5;
      break;
    case 39:
      video.currentTime += 5;
      break;
    default:
      console.log(e.keyCode);
  }
}

function handleForwardBackward(flag) {
  if (flag === 1) {
    video.currentTime += 5;
  } else {
    video.currentTime -= 5;
  }
}

videoLoop.addEventListener("click", handleVideoLoop);

function handleVideoLoop() {
  if (video.loop) {
    video.loop = false;
    videoLoop.style.color = "white";
  } else {
    video.loop = true;
    videoLoop.style.color = "dodgerblue";
  }
}

playBack.addEventListener("onchange", handlePlayBackSpeed);

function handlePlayBackSpeed() {
  video.playbackRate = playBack.value;
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
    onplaying: "handleProgress()",
    onended: "handleVidFinish()",
  };
  setAttributes(video, attr);
  attr = {
    onmouseover: "handleControlBar(1)",
    onmouseout: "handleControlBar(0)",
  };
  setAttributes(mainVideo, attr);
  mainVideo.insertBefore(video, mainVideo.childNodes[0]);
  currentTime.textContent = "0:00";
  PlayIcon.setAttribute("onclick", "PlayVid()");
  PlayIcon.style.cssText = "color: " + currentTheme;
  mainVTitle.textContent = element.Title;
  mainVDes.textContent = element.Description;
  video.onloadedmetadata = () => {
    let minutes = parseInt(video.duration / 60, 10);
    let seconds = Math.round(video.duration % 60);
    vidDuration.textContent = minutes + ":" + seconds;
  };
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
  progress.style.width = "0%";
  localStorage.setItem("mainVidStatus", 0);
  fetch("videoInfo.json")
    .then((res) => res.json())
    .then((data) => {
      let count = data.lenth;
      id = id === null ? 1 : id;
      posterContainer.innerHTML = "";
      let iTag = document.createElement("i");
      iTag.setAttribute(
        "class",
        "fa fa-play-circle fa-3x play-btn pointer theme"
      );
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

  let emailRegex = /^.*[@].*[.].*$/;

  if (validators.includes(fstname)) {
    formgroup = firstnameInp.parentElement;
    small.textContent = "Please Enter First Name";
    formgroup.appendChild(small);
  } else if (validators.includes(lstname)) {
    formgroup = lastnameInp.parentElement;
    small.textContent = "Please Enter Last Name";
    formgroup.appendChild(small);
  } else if (validators.includes(email)) {
    formgroup = emailInp.parentElement;
    small.textContent = "Please Enter Email Address";
    formgroup.appendChild(small);
  } else if (validators.includes(phno)) {
    formgroup = phoneInp.parentElement;
    small.textContent = "Please Enter Phone Number";
    formgroup.appendChild(small);
  } else if (phno.length !== 10) {
    formgroup = phoneInp.parentElement;
    small.textContent = "Invalid Phone Number.Must be 10 digits";
    formgroup.appendChild(small);
  } else {
    if (email.match(emailRegex)) {
      console.log("Submit form");
    } else {
      formgroup = emailInp.parentElement;
      small.textContent = "Invalid Email Address";
      formgroup.appendChild(small);
    }
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
