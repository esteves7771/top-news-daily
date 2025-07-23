const apiKey = "1e5b90cae5693516034037a9aef9da6a"; // Your valid API key
const apiUrl = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=10&token=${apiKey}`;

const container = document.getElementById("news-container");

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    container.innerHTML = ""; // Clear loading text
    data.articles.forEach(article => {
      const div = document.createElement("div");
      div.className = "article";
      div.innerHTML = `
        <h2>${article.title}</h2>
        <p><a href="${article.url}" target="_blank">Read more</a></p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => {
    container.innerHTML = "<p>Sorry, we couldn’t load the news. Try again later.</p>";
    console.error("Error loading news:", error);
  });

// Dark mode toggle
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

