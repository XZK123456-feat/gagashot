const menuButton = document.querySelector(".menu-button");
const menuPanel = document.querySelector(".menu-panel");
const tabs = document.querySelectorAll(".nav-tabs button");
const ctaButtons = document.querySelectorAll(".bottom-cta button, .hot-card button");
const weaponCard = document.querySelector(".weapon-card");
const weaponGallery = document.querySelector(".weapon-gallery");
const weaponTrack = weaponGallery.querySelector(".weapon-gallery__track");
const weaponClose = weaponGallery.querySelector(".weapon-gallery__close");
const weaponPrev = weaponGallery.querySelector(".weapon-gallery__arrow--prev");
const weaponNext = weaponGallery.querySelector(".weapon-gallery__arrow--next");
const weaponThumbs = weaponGallery.querySelectorAll(".weapon-gallery__thumbs button");
const heroCard = document.querySelector(".hero-card");
const heroGallery = document.querySelector(".hero-gallery:not(.weapon-gallery):not(.mode-gallery)");
const heroTrack = heroGallery.querySelector(".hero-gallery__track");
const heroClose = heroGallery.querySelector(".hero-gallery__close");
const heroPrev = heroGallery.querySelector(".hero-gallery__arrow--prev");
const heroNext = heroGallery.querySelector(".hero-gallery__arrow--next");
const heroThumbs = heroGallery.querySelectorAll(".hero-gallery__thumbs button");
const modeCard = document.querySelector(".mode-card");
const modeGallery = document.querySelector(".mode-gallery");
const modeTrack = modeGallery.querySelector(".mode-gallery__track");
const modeClose = modeGallery.querySelector(".mode-gallery__close");
const modePrev = modeGallery.querySelector(".mode-gallery__arrow--prev");
const modeNext = modeGallery.querySelector(".mode-gallery__arrow--next");
const modeThumbs = modeGallery.querySelectorAll(".mode-gallery__thumbs button");
const hotCard = document.querySelector(".hot-card");
const hotCardButton = document.querySelector(".hot-card button");
const communityPage = document.querySelector(".community-page");
const communityClose = document.querySelector(".community-page__close");
let weaponIndex = 0;
let heroIndex = 0;
let modeIndex = 0;

menuButton.addEventListener("click", () => {
  const isOpen = menuPanel.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuPanel.setAttribute("aria-hidden", String(!isOpen));
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const target = {
      start: ".hero-band",
      field: ".weapon-card",
      squad: ".hot-card",
    }[tab.dataset.tab];

    document.querySelector(target)?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  });
});

ctaButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => button.classList.add("pressed"));
  button.addEventListener("pointerup", () => button.classList.remove("pressed"));
  button.addEventListener("pointerleave", () => button.classList.remove("pressed"));
});

function setHeroIndex(nextIndex) {
  const total = heroThumbs.length;
  heroIndex = (nextIndex + total) % total;
  heroTrack.style.transform = `translateX(${-heroIndex * 100}%)`;
  heroThumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === heroIndex);
  });
}

function setWeaponIndex(nextIndex) {
  const total = weaponThumbs.length;
  weaponIndex = (nextIndex + total) % total;
  weaponTrack.style.transform = `translateX(${-weaponIndex * 100}%)`;
  weaponThumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === weaponIndex);
  });
}

function setModeIndex(nextIndex) {
  const total = modeThumbs.length;
  modeIndex = (nextIndex + total) % total;
  modeTrack.style.transform = `translateX(${-modeIndex * 100}%)`;
  modeThumbs.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === modeIndex);
  });
}

function openHeroGallery() {
  heroGallery.classList.add("open");
  heroGallery.setAttribute("aria-hidden", "false");
  setHeroIndex(heroIndex);
  heroNext.focus();
}

function closeHeroGallery() {
  heroGallery.classList.remove("open");
  heroGallery.setAttribute("aria-hidden", "true");
  heroCard.focus();
}

function openWeaponGallery() {
  weaponGallery.classList.add("open");
  weaponGallery.setAttribute("aria-hidden", "false");
  setWeaponIndex(weaponIndex);
  weaponNext.focus();
}

function closeWeaponGallery() {
  weaponGallery.classList.remove("open");
  weaponGallery.setAttribute("aria-hidden", "true");
  weaponCard.focus();
}

function openModeGallery() {
  modeGallery.classList.add("open");
  modeGallery.setAttribute("aria-hidden", "false");
  setModeIndex(modeIndex);
  modeNext.focus();
}

function closeModeGallery() {
  modeGallery.classList.remove("open");
  modeGallery.setAttribute("aria-hidden", "true");
  modeCard.focus();
}

function openCommunityPage() {
  hotCardButton.classList.remove("pressed");
  communityPage.classList.add("open");
  communityPage.setAttribute("aria-hidden", "false");
  communityClose.focus();
}

function closeCommunityPage() {
  communityPage.classList.remove("open");
  communityPage.setAttribute("aria-hidden", "true");
  communityClose.blur();
  hotCard.blur();
  hotCardButton.blur();
  hotCardButton.classList.remove("pressed");
}

weaponCard.addEventListener("click", openWeaponGallery);
weaponCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openWeaponGallery();
  }
});

weaponPrev.addEventListener("click", () => setWeaponIndex(weaponIndex - 1));
weaponNext.addEventListener("click", () => setWeaponIndex(weaponIndex + 1));
weaponClose.addEventListener("click", closeWeaponGallery);

weaponGallery.addEventListener("click", (event) => {
  if (event.target === weaponGallery) {
    closeWeaponGallery();
  }
});

weaponThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => setWeaponIndex(Number(thumb.dataset.weaponIndex)));
});

heroCard.addEventListener("click", openHeroGallery);
heroCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openHeroGallery();
  }
});

heroPrev.addEventListener("click", () => setHeroIndex(heroIndex - 1));
heroNext.addEventListener("click", () => setHeroIndex(heroIndex + 1));
heroClose.addEventListener("click", closeHeroGallery);

heroGallery.addEventListener("click", (event) => {
  if (event.target === heroGallery) {
    closeHeroGallery();
  }
});

heroThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => setHeroIndex(Number(thumb.dataset.heroIndex)));
});

modeCard.addEventListener("click", openModeGallery);
modeCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openModeGallery();
  }
});

modePrev.addEventListener("click", () => setModeIndex(modeIndex - 1));
modeNext.addEventListener("click", () => setModeIndex(modeIndex + 1));
modeClose.addEventListener("click", closeModeGallery);

modeGallery.addEventListener("click", (event) => {
  if (event.target === modeGallery) {
    closeModeGallery();
  }
});

modeThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => setModeIndex(Number(thumb.dataset.modeIndex)));
});

hotCard.addEventListener("click", openCommunityPage);
hotCard.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openCommunityPage();
  }
});

communityClose.addEventListener("click", closeCommunityPage);
communityPage.addEventListener("click", (event) => {
  if (event.target === communityPage) {
    closeCommunityPage();
  }
});

document.addEventListener("keydown", (event) => {
  if (communityPage.classList.contains("open")) {
    if (event.key === "Escape") {
      closeCommunityPage();
    }
    return;
  }

  if (weaponGallery.classList.contains("open")) {
    if (event.key === "Escape") {
      closeWeaponGallery();
    } else if (event.key === "ArrowLeft") {
      setWeaponIndex(weaponIndex - 1);
    } else if (event.key === "ArrowRight") {
      setWeaponIndex(weaponIndex + 1);
    }
    return;
  }

  if (modeGallery.classList.contains("open")) {
    if (event.key === "Escape") {
      closeModeGallery();
    } else if (event.key === "ArrowLeft") {
      setModeIndex(modeIndex - 1);
    } else if (event.key === "ArrowRight") {
      setModeIndex(modeIndex + 1);
    }
    return;
  }

  if (!heroGallery.classList.contains("open")) {
    return;
  }

  if (event.key === "Escape") {
    closeHeroGallery();
  } else if (event.key === "ArrowLeft") {
    setHeroIndex(heroIndex - 1);
  } else if (event.key === "ArrowRight") {
    setHeroIndex(heroIndex + 1);
  }
});

document.querySelector(".share-button").addEventListener("click", async () => {
  const shareData = {
    title: "嘎嘎射击",
    text: "立即开整，小心嘎了!",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch {
      // User cancelled the native share sheet.
    }
    return;
  }

  await navigator.clipboard?.writeText(window.location.href);
});
