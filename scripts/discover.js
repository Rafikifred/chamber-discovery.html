// Select containers
const gridContainer = document.querySelector(".discover-grid");
const visitMessage = document.querySelector(".visit-message");

// Show visit message using localStorage
function displayVisitMessage() {
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const diff = now - lastVisit;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${days} days ago.`;
    }
  }
  localStorage.setItem("lastVisit", now);
}

// Load JSON data and build discover cards
async function buildDiscoverCards() {
  try {
    const response = await fetch("data/discover.json");
    if (!response.ok) throw new Error("Failed to load places data.");
    const places = await response.json();

    places.forEach((place, index) => {
      const card = document.createElement("article");
      card.className = "card";
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="Photo of ${place.name}" loading="lazy" />
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button type="button" aria-label="Learn more about ${place.name}">Learn More</button>
      `;

      gridContainer.appendChild(card);
    });
  } catch (error) {
    gridContainer.textContent = "Sorry, we could not load the places data.";
    console.error(error);
  }
}

displayVisitMessage();
buildDiscoverCards();
