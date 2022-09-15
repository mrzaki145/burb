import Lenis from "@studio-freight/lenis";
import Headroom from "headroom.js";
import "matchmedia-polyfill/matchMedia";
import "matchmedia-polyfill/matchMedia.addListener";

import "./assets/styles/main.scss";

const lenis = new Lenis({
  lerp: 0.08,
  smooth: true,
});

function raf() {
  lenis.raf();
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// nav
const navEl = document.querySelector("#js_nav");
const navContentEl = navEl.querySelector("#js_navContent");
const navListEl = navEl.querySelector("#js_navList");
const toggleBtn = navEl.querySelector("#js_toggleBtn");

const headroomOpts = {
  classes: {
    initial: "nav",
    pinned: "nav--pinned",
    unpinned: "nav--unpinned",
    top: "nav--top",
  },
};
const headroom = new Headroom(navEl, headroomOpts);
headroom.init();

toggleBtn.addEventListener("click", (e) => {
  let isOpen = toggleBtn.getAttribute("aria-pressed");
  isOpen = isOpen == "true";
  toggleBtn.setAttribute("aria-pressed", !isOpen);
  toggleBtn.setAttribute("aria-expanded", !isOpen);

  if (!isOpen) {
    lenis.stop();
    navListEl.classList.add("open");
    toggleBtn.querySelector("use").setAttribute("href", "#close");
  } else {
    lenis.start();
    navListEl.classList.remove("open");
    toggleBtn.querySelector("use").setAttribute("href", "#menu");
  }
});

const mediaQuery = window.matchMedia("(max-width: 1023px)");
function handleDeviceChange(e) {
  if (e.matches) {
    if (navListEl.closest("#js_navContent")) {
      navEl.append(navListEl);
    }
  } else {
    lenis.start();
    if (!navListEl.closest("#js_navContent")) {
      navContentEl.append(navListEl);
    }
  }
}
mediaQuery.addListener(handleDeviceChange);
mediaQuery.addEventListener("change", handleDeviceChange);
handleDeviceChange(mediaQuery);

// feedback
const avatars = Array.from(document.querySelectorAll(".feedback .avatar"));
const contents = Array.from(document.querySelectorAll(".feedback .content"));

function switchFeedback() {
  const activeAvatar = avatars.find((el) => el.classList.contains("active"));
  const activeContent = contents.find((el) => el.classList.contains("active"));
  const nextAvatar = activeAvatar.nextElementSibling
    ? activeAvatar.nextElementSibling
    : avatars[0];
  const nextContent = activeContent.nextElementSibling
    ? activeContent.nextElementSibling
    : contents[0];

  activeAvatar.classList.remove("active");
  activeContent.classList.remove("active");
  nextAvatar.classList.add("active");
  nextContent.classList.add("active");
}

let interval = setInterval(switchFeedback, 10000);

avatars.forEach((el) => {
  el.addEventListener("click", (e) => {
    const current = e.currentTarget;
    const activeAvatar = avatars.find((el) => el.classList.contains("active"));

    if (current == activeAvatar) return;
    clearInterval(interval);

    const activeContent = contents.find((el) =>
      el.classList.contains("active")
    );
    const nextContent = activeContent.nextElementSibling
      ? activeContent.nextElementSibling
      : contents[0];

    activeAvatar.classList.remove("active");
    activeContent.classList.remove("active");
    current.classList.add("active");
    nextContent.classList.add("active");

    interval = setInterval(switchFeedback, 10000);
  });
});
