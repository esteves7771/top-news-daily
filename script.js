const apiKey = "9e4b708cfff3f74b93ac92643641d192"; // 🔐 Replace with your real API key
const apiUrl = `https://cors-anywhere.herokuapp.com/https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=10&token=${apiKey}`;

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

