// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");
  const visitorMessage = document.getElementById("visitor-message");

  // Display visitor message using localStorage
  const lastVisitKey = "last-visit";
  const now = Date.now();
  const lastVisit = localStorage.getItem(lastVisitKey);

  if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - Number(lastVisit);
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      visitorMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitorMessage.textContent = `You last visited ${diffDays} days ago.`;
    }
  }
  localStorage.setItem(lastVisitKey, now.toString());

  // Fetch JSON data and create cards
  fetch("data/places.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("card");

        card.innerHTML = `
          <h2>${place.title}</h2>
          <figure>
            <img src="${place.image}" alt="${place.title}" loading="lazy" />
          </figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button type="button" aria-label="Learn more about ${place.title}">Learn More</button>
        `;

        container.appendChild(card);
      });
    })
    .catch((error) => {
      container.innerHTML = "<p>Sorry, we couldn't load the places at this time.</p>";
      console.error("Fetch error:", error);
    });
});
