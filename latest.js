document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.getElementById("latest-carousel-inner");
  const loader = document.getElementById("latest-carousel-loader");
  const prevBtn = document.getElementById("latest-prev");
  const nextBtn = document.getElementById("latest-next");

  // Load videos
  fetch("https://smileschool-api.hbtn.info/latest-videos")
    .then((res) => res.json())
    .then((videos) => {
      carouselInner.innerHTML = "";

      videos.forEach((video) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <img src="${video.thumb_url}" class="card-img-top" alt="Video thumbnail">
          <div class="card-img-overlay text-center">
            <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
          </div>
          <div class="card-body">
            <h5 class="card-title font-weight-bold">${video.title}</h5>
            <p class="card-text text-muted">${video['sub-title']}</p>
            <div class="creator d-flex align-items-center">
              <img src="${video.author_pic_url}" alt="${video.author}" width="30px" class="rounded-circle" />
              <h6 class="pl-3 m-0 main-color">${video.author}</h6>
            </div>
            <div class="info pt-3 d-flex justify-content-between">
              <div class="rating">
                ${generateStars(video.star)}
              </div>
              <span class="main-color">${video.duration}</span>
            </div>
          </div>
        `;
        carouselInner.appendChild(card);
      });
    });

  function generateStars(starCount) {
    let html = "";
    for (let i = 0; i < 5; i++) {
      html += `<img src="images/${i < starCount ? "star_on" : "star_off"}.png" alt="star" width="15px">`;
    }
    return html;
  }

  // Scroll by card width 
  const scrollCarousel = (direction) => {
    loader.classList.remove("d-none");

    setTimeout(() => {
      const card = carouselInner.querySelector(".card");
      if (!card) return;
      const scrollAmount = card.offsetWidth + 16; // +gap

      carouselInner.scrollLeft += direction === "next" ? scrollAmount : -scrollAmount;

      loader.classList.add("d-none");
    }, 300); // simulate async
  };

  nextBtn.addEventListener("click", () => scrollCarousel("next"));
  prevBtn.addEventListener("click", () => scrollCarousel("prev"));
});
