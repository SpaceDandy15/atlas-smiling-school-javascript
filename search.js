document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://smileschool-api.hbtn.info/courses";
  
    const keywordsInput = document.getElementById("search-keywords");
    const topicSelect = document.getElementById("topic-filter");
    const sortSelect = document.getElementById("sort-filter");
    const loader = document.getElementById("courses-loader");
    const container = document.getElementById("courses-container");
  
    // Show loader
    const showLoader = () => loader.classList.remove("d-none");
    const hideLoader = () => loader.classList.add("d-none");
  
    // Load dropdowns and default courses
    function loadCourses() {
      showLoader();
      const query = keywordsInput.value;
      const topic = topicSelect.value;
      const sort = sortSelect.value;
  
      const url = `${API_URL}?q=${encodeURIComponent(query)}&topic=${encodeURIComponent(topic)}&sort=${encodeURIComponent(sort)}`;
  
      fetch(url)
        .then(res => res.json())
        .then(data => {
          // Populate filters (only once)
          if (topicSelect.length === 0 && data.topics) {
            data.topics.forEach(topic => {
              topicSelect.innerHTML += `<option value="${topic}">${topic}</option>`;
            });
          }
  
          if (sortSelect.length === 0 && data.sorts) {
            data.sorts.forEach(sort => {
              sortSelect.innerHTML += `<option value="${sort}">${sort}</option>`;
            });
          }
  
          // Set initial keyword value from API if present
          if (data.q && keywordsInput.value === "") {
            keywordsInput.value = data.q;
          }
  
          // Clear and load cards
          container.innerHTML = "";
  
          if (data.courses && data.courses.length > 0) {
            data.courses.forEach(course => {
              container.innerHTML += `
                <div class="col-12 col-sm-6 col-lg-3 mb-4">
                  <div class="card border-0">
                    <img src="${course.thumb_url}" class="card-img-top" alt="${course.title}" />
                    <div class="card-body">
                      <h5 class="card-title font-weight-bold">${course.title}</h5>
                      <p class="card-text text-muted">${course['sub-title']}</p>
                      <div class="d-flex align-items-center my-2">
                        <img src="${course.author_pic_url}" alt="${course.author}" class="rounded-circle mr-2" width="30" />
                        <span class="text-primary font-weight-bold">${course.author}</span>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <div class="text-warning">
                          ${"★".repeat(course.star)}${"☆".repeat(5 - course.star)}
                        </div>
                        <span class="text-muted">${course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              `;
            });
          } else {
            container.innerHTML = `<div class="col-12 text-center text-muted">No courses found.</div>`;
          }
        })
        .catch(error => {
          console.error("Error fetching courses:", error);
          container.innerHTML = `<div class="col-12 text-center text-danger">Error loading courses</div>`;
        })
        .finally(() => {
          hideLoader();
        });
    }
  
    // Load on page start
    loadCourses();
  
    // Reload on filter change
    keywordsInput.addEventListener("input", () => loadCourses());
    topicSelect.addEventListener("change", () => loadCourses());
    sortSelect.addEventListener("change", () => loadCourses());
  });
  