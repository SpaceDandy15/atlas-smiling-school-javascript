document.addEventListener("DOMContentLoaded", () => {
  const quotesSection = document.getElementById("quotes-section");
  const slideLoader = document.getElementById("slide-loader"); // Loader element

  // Create and insert initial loader (for initial quotes fetch)
  const loader = document.createElement("div");
  loader.classList.add("loader", "my-5");
  quotesSection.appendChild(loader);

  // Fetch quotes from API
  fetch("https://smileschool-api.hbtn.info/quotes")
    .then((response) => response.json())
    .then((data) => {
      loader.remove(); // Remove initial loader after quotes are fetched

      // Add quotes to carousel
      data.forEach((quote, index) => {
        const item = document.createElement("div");
        item.className = "carousel-item" + (index === 0 ? " active" : "");

        item.innerHTML = `
          <div class="row mx-auto align-items-center">
            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
              <img
                src="${quote.pic_url}"
                class="d-block align-self-center rounded-circle"
                alt="${quote.name}"
              />
            </div>
            <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
              <div class="quote-text">
                <p class="text-white">« ${quote.text} »</p>
                <h4 class="text-white font-weight-bold">${quote.name}</h4>
                <span class="text-white">${quote.title}</span>
              </div>
            </div>
          </div>
        `;

        quotesSection.appendChild(item);
      });

      // Add slide transition loader (optional UX enhancement)
      const carousel = document.getElementById("carouselExampleControls"); // carousel id in your HTML

      if (carousel) {
        // Debugging to check if carousel events are firing
        console.log("Carousel initialized");

        carousel.addEventListener("slide.bs.carousel", () => {
          console.log("Slide started");
          slideLoader.classList.remove("d-none"); // Show loader when slide starts
        });

        carousel.addEventListener("slid.bs.carousel", () => {
          console.log("Slide ended");
          setTimeout(() => {
            slideLoader.classList.add("d-none"); // Hide loader after a short delay
          }, 300); // Optional delay for effect
        });
      } else {
        console.log("Carousel element not found!");
      }
    })
    .catch((error) => {
      loader.remove();
      quotesSection.innerHTML = "<p class='text-white'>Failed to load quotes.</p>";
      console.error("Error loading quotes:", error);
    });
});
