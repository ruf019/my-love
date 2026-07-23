const page = {
  heroTitle: "Я хочу сказать тебе самое важное",
  heroText:
    "Не чтобы спорить, не чтобы оправдываться. Просто чтобы ты увидела: я понял, где был неправ, и правда хочу быть рядом иначе.",
  letter: [
    "Прости меня за то, что рядом со мной ты могла чувствовать себя не такой важной, какой ты всегда была для меня.",
    "Я слишком часто откладывал внимание, заботу и простые слова на потом. Сейчас мне больно понимать, что именно это \"потом\" забирало у нас тепло.",
    "Я не хочу обещать громко. Я хочу быть внимательнее каждый день, слышать тебя, выбирать тебя и показывать это поступками."
  ],
  memories: [
    {
      image: "photos/photo3.jpg",
      title: "Улыбка",
      text: "Одна из тех вещей, из-за которых я понял, как много мне в тебе дорого."
    },
    {
      image: "photos/photo15.jpg",
      title: "Наши вечера",
      text: "Каждый вечер с тобой — особенный."
    },
    {
      image: "photos/photo9.jpg",
      title: "Тепло",
      text: "Момент, в котором всё вокруг будто становилось тише."
    },
    {
      image: "photos/photo4.jpg",
      title: "Ты рядом",
      text: "И этого достаточно."
    },
    {
      image: "photos/photo7.jpg",
      title: "Наш мир",
      text: "Маленький, настоящий, только наш."
    },
    {
      image: "photos/photo8.jpg",
      title: "Счастье",
      text: "Не громкое. Просто то самое, которое хочется беречь."
    },
    {
      image: "photos/photo5.jpg",
      title: "Тот день",
      text: "Фото не передаст, как мне хорошо с тобой."
    },
    {
      image: "photos/photo10.jpg",
      title: "Близко",
      text: "Когда ничего лишнего не нужно."
    },
    {
      image: "photos/photo11.jpg",
      title: "Твой смех",
      text: "То, что я вспоминаю первым, когда думаю о нас."
    },
    {
      image: "photos/photo12.jpg",
      title: "Момент",
      text: "Такой простой, но почему-то очень важный."
    },
    {
      image: "photos/photo13.jpg",
      title: "24/7",
      text: "С тобой время летит незаметно."
    },
    {
      image: "photos/photo14.jpg",
      title: "Память",
      text: "Вместе сквозь годы."
    }
  ]
};

const createStarField = () => {
  const starField = document.getElementById("star-field");
  if (!starField) return;

  // A seeded generator keeps the sky natural-looking without changing on reload.
  let seed = 1207;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const fragment = document.createDocumentFragment();
  const starCount = window.matchMedia("(max-width: 560px)").matches ? 78 : 110;

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("span");
    const chance = random();
    const kind = chance > 0.93 ? "radiant" : chance > 0.72 ? "glow" : "dust";
    const warmth = random() > 0.78 ? "warm" : random() > 0.78 ? "cool" : "neutral";

    star.className = `sky-star sky-star-${kind} sky-star-${warmth}`;
    star.style.setProperty("--x", `${(random() * 100).toFixed(2)}%`);
    star.style.setProperty("--y", `${(random() * 100).toFixed(2)}%`);
    star.style.setProperty("--delay", `${(-random() * 9).toFixed(2)}s`);
    star.style.setProperty("--duration", `${(4.5 + random() * 6).toFixed(2)}s`);
    star.style.setProperty("--opacity", `${(0.38 + random() * 0.55).toFixed(2)}`);
    fragment.appendChild(star);
  }

  starField.appendChild(fragment);
};

createStarField();

const setText = (id, text) => {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
};

const setDecoratedText = (id, text) => {
  const node = document.getElementById(id);
  if (!node || !text) return;

  const firstLetter = document.createElement("span");
  firstLetter.className = "drop-letter";
  firstLetter.textContent = text[0];

  node.textContent = "";
  node.append(firstLetter, document.createTextNode(text.slice(1)));
};

setText("hero-title", page.heroTitle);
setText("hero-text", page.heroText);
setDecoratedText("letter-line-1", page.letter[0]);
setText("letter-line-2", page.letter[1]);
setText("letter-line-3", page.letter[2]);

const memoryGrid = document.getElementById("memory-grid");
const lightbox = document.getElementById("photo-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxText = document.getElementById("lightbox-text");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");
const finalRevealButton = document.getElementById("final-reveal-button");
const finalMessageModal = document.getElementById("final-message-modal");
const finalMessageClose = document.querySelector(".message-modal-close");
const finalMessageBackdrop = document.querySelector(".message-modal-backdrop");
let lastOpenedCard = null;
let finalMessageTrigger = null;

const setLightboxContent = (index) => {
  const memory = page.memories[index];
  if (!memory || !lightboxImage || !lightboxTitle || !lightboxText) return;

  lightboxImage.src = memory.image;
  lightboxImage.alt = memory.title;
  lightboxTitle.textContent = memory.title;
  lightboxText.textContent = memory.text;
};

const openLightbox = (index) => {
  if (!lightbox) return;

  lastOpenedCard = document.activeElement;
  setLightboxContent(index);
  lightbox.removeAttribute("inert");
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
  lightboxClose?.focus({ preventScroll: true });
};

const closeLightbox = () => {
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.setAttribute("inert", "");
  document.body.classList.remove("lightbox-open");
  lastOpenedCard?.focus?.({ preventScroll: true });
};

const openFinalMessage = () => {
  if (!finalMessageModal) return;

  finalMessageTrigger = document.activeElement;
  finalMessageModal.removeAttribute("inert");
  finalMessageModal.classList.add("is-open");
  finalMessageModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("message-modal-open");
  finalMessageClose?.focus({ preventScroll: true });
};

const closeFinalMessage = () => {
  if (!finalMessageModal) return;

  finalMessageModal.classList.remove("is-open");
  finalMessageModal.setAttribute("aria-hidden", "true");
  finalMessageModal.setAttribute("inert", "");
  document.body.classList.remove("message-modal-open");
  finalMessageTrigger?.focus?.({ preventScroll: true });
};

page.memories.forEach((memory, index) => {
  const card = document.createElement("article");
  card.className = "memory-card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Открыть фото: ${memory.title}`);

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const caption = document.createElement("figcaption");
  const title = document.createElement("strong");
  const text = document.createElement("span");

  image.loading = "lazy";
  image.decoding = "async";
  image.src = memory.image;
  image.alt = memory.title;
  title.textContent = memory.title;
  text.textContent = memory.text;

  caption.append(title, text);
  figure.append(image, caption);
  card.append(figure);
  card.addEventListener("click", () => openLightbox(index));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  });
  memoryGrid.appendChild(card);
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxBackdrop?.addEventListener("click", closeLightbox);
finalRevealButton?.addEventListener("click", openFinalMessage);
finalMessageClose?.addEventListener("click", closeFinalMessage);
finalMessageBackdrop?.addEventListener("click", closeFinalMessage);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (finalMessageModal?.classList.contains("is-open")) {
    closeFinalMessage();
    return;
  }

  if (lightbox?.classList.contains("is-open")) closeLightbox();
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll(".letter-meta, .letter-scene, .memory-card, .final-reveal")
  .forEach((node) => {
    node.classList.add("is-hidden");
    revealObserver.observe(node);
  });
