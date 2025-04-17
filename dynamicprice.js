document.addEventListener("DOMContentLoaded", function () {
    const carouselInner = document.getElementById("quotes-carousel-inner");
    const loader = document.getElementById("carousel-loader");
    const carousel = document.getElementById("carouselExampleControls");
  
    // Show loader on load
    loader.classList.remove("d-none");
  
    fetch("https://smileschool-api.hbtn.info/quotes")
      .then((response) => response.json())
      .then((data) => {
        carouselInner.innerHTML = "";
  
        data.forEach((quote, index) => {
          const isActive = index === 0 ? "active" : "";
          const quoteItem = `
            <div class="carousel-item ${isActive}">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img src="${quote.photo}" class="d-block align-self-center rounded-circle" alt="${quote.name}" width="160" />
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                    <p class="text-white">“${quote.text}”</p>
                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                    <span class="text-white">${quote.title}</span>
                  </div>
                </div>
              </div>
            </div>`;
          carouselInner.insertAdjacentHTML("beforeend", quoteItem);
        });
      })
      .catch((err) => {
        carouselInner.innerHTML = `<div class="text-white text-center">Failed to load quotes.</div>`;
        console.error(err);
      })
      .finally(() => {
        loader.classList.add("d-none");
      });
  
    // Add loader on arrow click
    const controls = carousel.querySelectorAll(".carousel-control-prev, .carousel-control-next");
  
    controls.forEach((control) => {
      control.addEventListener("click", () => {
        loader.classList.remove("d-none");
  
        // Simulate loading delay
        setTimeout(() => {
          loader.classList.add("d-none");
        }, 500);
      });
    });
  });
  