const series = [
  {
    title: "夜景氛围",
    kicker: "烟花 / 城市 / 微光",
    cover: "assets/photos/night_fire_04.jpg",
    note: "用环境光和烟火做情绪中心，适合展示夜景控光与现场引导。",
    images: [
      "night_fire_04",
      "night_fire_05",
      "night_fire_01",
      "night_fire_02",
      "night_fire_03",
    ],
  },
  {
    title: "低调棚拍",
    kicker: "Low-key / 光比 / 肖像",
    cover: "assets/photos/lowkey_04.jpg",
    note: "用暗部、侧光和投影建立人物轮廓，画面更克制。",
    images: ["lowkey_04", "lowkey_05", "lowkey_01", "lowkey_02", "lowkey_03"],
  },
  {
    title: "主题策划",
    kicker: "布景 / 道具 / 情绪",
    cover: "assets/photos/story_christmas_03.jpg",
    note: "从场景、道具到人物状态，强调一组照片的完整气氛。",
    images: [
      "story_christmas_03",
      "story_christmas_01",
      "story_christmas_02",
      "story_christmas_04",
      "story_gothic_01",
      "story_gothic_02",
      "story_gothic_03",
      "story_snow_01",
    ],
  },
  {
    title: "季节人像",
    kicker: "春樱 / 秋枫 / 花海",
    cover: "assets/photos/season_cherry_02.jpg",
    note: "用前景、色彩和运动感，让自然环境参与叙事。",
    images: [
      "season_cherry_02",
      "season_cherry_01",
      "season_cherry_03",
      "season_rape_01",
      "season_autumn_01",
      "season_autumn_02",
      "season_autumn_03",
      "season_autumn_04",
    ],
  },
  {
    title: "校园叙事",
    kicker: "日常 / 窗光 / 状态",
    cover: "assets/photos/campus_02.jpg",
    note: "以安静的姿态和环境光表现人物状态，减少过度摆拍。",
    images: ["campus_02", "campus_01", "campus_03", "daily_lake_01", "daily_lake_02", "daily_lake_03"],
  },
  {
    title: "风格造型",
    kicker: "国风 / 妆造 / 场景",
    cover: "assets/photos/style_hanfu_07.jpg",
    note: "在服装和场景限制下保持人物、背景和色彩统一。",
    images: [
      "style_hanfu_07",
      "style_hanfu_01",
      "style_hanfu_02",
      "style_hanfu_03",
      "style_hanfu_04",
      "style_hanfu_05",
      "style_hanfu_06",
    ],
  },
];

const grid = document.querySelector("#seriesGrid");
const modal = document.querySelector("#galleryModal");
const modalTitle = document.querySelector("#modalTitle");
const modalKicker = document.querySelector("#modalKicker");
const modalCount = document.querySelector("#modalCount");
const modalImages = document.querySelector("#modalImages");
const closeButton = document.querySelector(".modal-close");
const navPanel = document.querySelector(".nav-panel");
const menuButton = document.querySelector(".menu-button");

series.forEach((item, index) => {
  const card = document.createElement("article");
  card.className = "series-card reveal";
  card.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  card.innerHTML = `
    <img src="${item.cover}" alt="${item.title}作品封面" loading="lazy">
    <div class="series-content">
      <span>${item.kicker}</span>
      <h3>${item.title}</h3>
      <p>${item.note}</p>
      <button type="button">查看系列</button>
    </div>
  `;
  card.querySelector("button").addEventListener("click", () => openGallery(item));
  card.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") openGallery(item);
  });
  grid.appendChild(card);
});

function openGallery(item) {
  modalTitle.textContent = item.title;
  modalKicker.textContent = item.kicker;
  modalCount.textContent = `${item.images.length} 张作品`;
  modalImages.innerHTML = item.images
    .map((id) => `<img src="assets/photos/${id}.jpg" alt="${item.title}作品" loading="lazy">`)
    .join("");
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeGallery() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

closeButton.addEventListener("click", closeGallery);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeGallery();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeGallery();
});

menuButton.addEventListener("click", () => {
  navPanel.classList.toggle("is-open");
});

navPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navPanel.classList.remove("is-open"));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".reveal, .timeline-item").forEach((element) => {
  observer.observe(element);
});

const timeline = document.querySelector("#timeline");
const timelineObserver = new IntersectionObserver(
  ([entry]) => {
    timeline.style.setProperty("--line-progress", entry.isIntersecting ? "100%" : "0%");
  },
  { threshold: 0.38 },
);

timelineObserver.observe(timeline);
