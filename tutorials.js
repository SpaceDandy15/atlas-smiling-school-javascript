document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.getElementById("tutorials-carousel-inner");
  const loader = document.getElementById("carousel-loader");
  const carousel = document.getElementById("carouselExampleControls2");

  loader.classList.remove("d-none");

  fetch("https://smileschool-api.hbtn.info/popular-tutorials")
    .then((response) => response.json())
    .then((data) => {
      carouselInner.innerHTML = "";

      // Group cards in sets of 4 per slide
      for (let i = 0; i < data.length; i += 4) {
        const slide = document.createElement("div");
        slide.classList.add("carousel-item");
        if (i === 0) slide.classList.add("active");

        const row = document.createElement("div");
        row.className = "row justify-content-center"; // Bootstrap row

        for (let j = i; j < i + 4 && j < data.length; j++) {
          const video = data[j];
          const col = document.createElement("div");
          col.className = "col-md-3"; // 4 columns per row

          col.innerHTML = `
            <div class="card mb-4">
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
            </div>
          `;

          row.appendChild(col);
        }

        slide.appendChild(row);
        carouselInner.appendChild(slide);
      }
    })
    .catch((error) => {
      console.error("Error fetching tutorials:", error);
    })
    .finally(() => {
      loader.classList.add("d-none");
      $(carousel).carousel('dispose');
      $(carousel).carousel();
    });

  function generateStars(starCount) {
    let html = "";
    for (let i = 0; i < 5; i++) {
      html += `<img src="images/${i < starCount ? "star_on" : "star_off"}.png" alt="star" width="15px">`;
    }
    return html;
  }
});
