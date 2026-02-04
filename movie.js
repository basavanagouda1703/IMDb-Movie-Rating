const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");

const titleEl = document.getElementById("title");
const yearEl = document.getElementById("year");
const typeEl = document.getElementById("type");
const ratingEl = document.getElementById("rating");
const posterEl = document.getElementById("poster");
const plotEl = document.getElementById("plot");
const errorMsg = document.getElementById("errorMsg");

const API_KEY = "31080906";

function clearDetails() {
    titleEl.textContent = "";
    yearEl.textContent = "";
    typeEl.textContent = "";
    ratingEl.textContent = "";
    posterEl.innerHTML = "";
    plotEl.textContent = "";
}

searchBtn.addEventListener("click", () => {
    const movieName = movieInput.value.trim();

    clearDetails();
    errorMsg.textContent = "";

    if (movieName === "") {
        errorMsg.textContent = "Please enter a movie or series name.";
        return;
    }

    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                errorMsg.textContent = "Movie or series not found.";
                return;
            }

            titleEl.textContent = `Title: ${data.Title}`;
            yearEl.textContent = `Year: ${data.Year}`;
            typeEl.textContent = `Type: ${data.Type}`;
            ratingEl.textContent = `IMDb Rating: ${data.imdbRating}`;
            plotEl.textContent = `Plot: ${data.Plot}`;

            if (data.Poster !== "N/A") {
                const img = document.createElement("img");
                img.src = data.Poster;
                img.alt = data.Title;
                posterEl.appendChild(img);
            } else {
                posterEl.textContent = "No poster available.";
            }
        })
        .catch(error => {
            clearDetails();
            errorMsg.textContent = "Something went wrong. Please try again later.";
            console.error(error);
        });
});
