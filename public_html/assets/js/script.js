'use strict';

/**
 * element toggle function
 */
const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [];

if (overlay) navElemArr.push(overlay);
if (navCloseBtn) navElemArr.push(navCloseBtn);
if (navOpenBtn) navElemArr.push(navOpenBtn);

for (let i = 0; i < navbarLinks.length; i++) {
  navElemArr.push(navbarLinks[i]);
}

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    if (navbar && overlay) {
      elemToggleFunc(navbar);
      elemToggleFunc(overlay);
    }
  });
}

/**
 * header active state
 */
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (header) {
    window.scrollY >= 400
      ? header.classList.add("active")
      : header.classList.remove("active");
  }
});

/**
 * add active class on header & back to top button
 */
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (header && backTopBtn) {
    if (window.scrollY >= 50) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  }
});

/**
 * fade-up animation observer
 */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => observer.observe(element));
});

/**
 * auto scroll aminities section
 */
window.addEventListener("load", () => {
  const aminitiesList = document.querySelector(".aminities-list");
  if (!aminitiesList) return;

  const scrollInterval = setInterval(() => {
    const card = aminitiesList.querySelector("li");
    if (!card) return;

    const cardWidth = card.offsetWidth + 20;
    aminitiesList.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });
  }, 3000);

  aminitiesList.addEventListener("transitionend", () => {
    if (
      aminitiesList.scrollLeft >=
      aminitiesList.scrollWidth - aminitiesList.offsetWidth
    ) {
      aminitiesList.scrollLeft = 0;
    }
  });
});

/**
 * floating button popup form
 */
document.addEventListener("DOMContentLoaded", function () {
  const floatingBtn = document.querySelector(".floating-btn");
  const popupForm = document.querySelector(".popup-form");
  const closeBtn = document.querySelector(".close-btn");

  if (floatingBtn && popupForm && closeBtn) {
    
    floatingBtn.addEventListener("click", function () {
      floatingBtn.classList.add("active");
      popupForm.classList.add("active");
    });

    closeBtn.addEventListener("click", function () {
      floatingBtn.classList.remove("active");
      popupForm.classList.remove("active");
    });
  }
});

/**
 * FAQ toggle
 */
const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        faqItems.forEach((el) => el.classList.remove("active"));

        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

/**
 * consent popup
 */
const popup = document.getElementById("popup");
const noticePopup = document.getElementById("notice-popup");
const agreeBtn = document.getElementById("agreeBtn");
const closeBtn = document.getElementById("closeBtn");

const floatingBtn = document.querySelector(".floating-btn");
const popupForm = document.querySelector(".popup-form");

if (noticePopup && closeBtn) {
  if (!sessionStorage.getItem("noticeShown")) {
    noticePopup.classList.remove("hidden");
  }

  closeBtn.addEventListener("click", () => {
    noticePopup.classList.add("hidden");
    floatingBtn.classList.add("active");
      popupForm.classList.add("active");
    // sessionStorage.setItem("noticeShown", "true");
  });
}
if (popup && agreeBtn) {
  if (!sessionStorage.getItem("popupShown")) {
    popup.classList.remove("hidden");
  }

  agreeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    // sessionStorage.setItem("popupShown", "true");
  });
}


function openNav() {
  document.getElementById("mySidenav").style.width = "25%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}