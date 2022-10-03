import gsap from "gsap";
import Headroom from "headroom.js";

document.addEventListener("DOMContentLoaded", () => {
  const navEl = document.querySelector("#js_nav");
  const navListEl = navEl.querySelector("#js_navList");
  const navContentEl = navEl.querySelector("#js_navContent");
  const toggleBtn = navEl.querySelector("#js_toggleBtn");
  const navListAnime = gsap.from(navListEl, {
    x: "100%",
    duration: 0.3,
    paused: true,
  });

  new Headroom(navEl, {
    classes: {
      initial: "nav",
      pinned: "nav--pinned",
      unpinned: "nav--unpinned",
      top: "nav--top",
    },
  }).init();

  toggleBtn.addEventListener("click", () => {
    if (
      toggleBtn.getAttribute("aria-expanded") === "false" &&
      navEl.dataset.listState == "closed"
    ) {
      navListAnime.play();
      navEl.dataset.listState = "open";
      toggleBtn.setAttribute("aria-expanded", "true");
      toggleBtn.querySelector("use").setAttribute("href", "#close");
    } else {
      navListAnime.reverse();
      navEl.dataset.listState = "closed";
      toggleBtn.setAttribute("aria-expanded", "false");
      toggleBtn.querySelector("use").setAttribute("href", "#menu");
    }
  });

  const mm = gsap.matchMedia();
  mm.add(
    { isMobile: "(max-width: 1023px)", isDesktop: "(min-width: 1024px)" },
    (ctx) => {
      const { isMobile, isDesktop } = ctx.conditions;

      if (isMobile) {
        navEl.append(navListEl);
        // navListAnime.resetTo("x", "100%");
      } else if (isDesktop) {
        navEl.dataset.listState = "closed";
        navContentEl.append(navListEl);
        // navListAnime.resetTo("x", "0");
      }
    }
  );

  // feedback
  const avatars = Array.from(document.querySelectorAll(".feedback .avatar"));
  const contents = Array.from(document.querySelectorAll(".feedback .content"));

  function switchFeedback() {
    const activeAvatar = avatars.find((el) => el.classList.contains("active"));
    const activeContent = contents.find((el) =>
      el.classList.contains("active")
    );
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
      const activeAvatar = avatars.find((el) =>
        el.classList.contains("active")
      );

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
});

window.onload = function () {
  gsap.to(document.querySelector(".overlay"), { scaleY: 0 });
};
