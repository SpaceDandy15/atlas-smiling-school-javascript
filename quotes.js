document.addEventListener("DOMContentLoaded", function () {
  const quotesSection = document.getElementById("quotes-section");

  fetch("https://smileschool-api.hbtn.info/quotes")
    .then(response => response.json())
    .then(data => {
      quotesSection.innerHTML = ''; // Remove loader
      data.forEach(quote => {
        const quoteHTML = `
          <div class="quote-item text-white text-center p-4">
            <img src="${quote.pic_url}" alt="${quote.name}" class="rounded-circle mb-3" width="100">
            <p class="blockquote">${quote.text}</p>
            <p class="font-weight-bold mb-0">${quote.name}</p>
            <p class="font-italic">${quote.title}</p>
          </div>
        `;
        quotesSection.innerHTML += quoteHTML;
      });

      //Slick Carousel, initialize it here:
      // $('.slick-carousel').slick();
    })
    .catch(error => {
      console.error("Error fetching quotes:", error);
      quotesSection.innerHTML = "<p>Failed to load quotes.</p>";
    });
});
