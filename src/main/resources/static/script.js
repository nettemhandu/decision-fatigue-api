const apiBaseUrl = "http://localhost:8080/movies/recommendation?genre=";

document.getElementById("getMovie").addEventListener("click", async () => {
    const genre = document.getElementById("genre").value;
    if (!genre) return alert("Please enter a genre!");

    // Fetch movie from backend
    const response = await fetch(`${apiBaseUrl}${genre}`);
    const text = await response.text();

    // Backend returns title|overview|posterPath (adjust backend to return poster URL)
    const [title, overview, posterPath] = text.split("|");

    document.getElementById("movieTitle").innerText = title;
    document.getElementById("movieOverview").innerText = overview;
    document.getElementById("poster").src = posterPath;
    document.getElementById("recommendationCard").classList.remove("hidden");
});