const apiKey = "1e5b90cae5693516034037a9aef9da6a";
const container = document.getElementById("news-container");
const languageSelector = document.getElementById("language-selector");
const toggleButton = document.getElementById("toggle-theme");

// Fetch news by language
function fetchNews(lang = "en") {
  const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=${lang}&country=us&max=10&token=${apiKey}`;
  container.innerHTML = "<p>Loading latest news...</p>";

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
container.innerHTML = ""; // Clear loading text
data.articles.forEach(article => {
  const div = document.createElement("div");
  div.className = "article";

  div.innerHTML = `
    <img src="${article.image}" alt="News image" class="thumbnail" />
    <div class="text-block">
      <h2>${article.title}</h2>
      <button class="preview-btn" data-url="${article.url}">Read more</button>
    </div>
  `;

  container.appendChild(div);
});

// Event delegation for preview
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("preview-btn")) {
    const url = e.target.getAttribute("data-url");
    openPreview(url);
  }
});

// Preview function
function openPreview(url) {
  const overlay = document.createElement("div");
  overlay.className = "preview-overlay";
  overlay.innerHTML = `
    <div class="preview-box">
      <iframe src="${url}" frameborder="0"></iframe>
      <button class="close-preview">×</button>
    </div>
  `;
  document.body.appendChild(overlay);

  document.querySelector(".close-preview").onclick = () => overlay.remove();
}

// Load news on start
fetchNews("en");

// Language change listener
languageSelector.addEventListener("change", () => {
  fetchNews(languageSelector.value);
});

// Dark mode toggle
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
