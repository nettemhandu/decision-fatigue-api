document.getElementById("getMovie").addEventListener("click", async () => {
    const genre = document.getElementById("genre").value;
    const response = await fetch(`http://localhost:8080/movies/recommendation?genre=${genre}`);
    const text = await response.text();
    document.getElementById("recommendation").innerText = text;
});