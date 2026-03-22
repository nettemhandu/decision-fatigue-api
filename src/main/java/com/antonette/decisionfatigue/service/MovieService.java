package com.antonette.decisionfatigue.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Service
public class MovieService {

    @Value("${tmdb.apiKey}")
    private String apiKey;

    private static final String IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

    public String getMovie(String genre) {

        RestTemplate restTemplate = new RestTemplate();

        // Map known genre to TMDB ID, empty string means "all genres"
        String genreId = mapGenreToId(genre);

        // Build URL to fetch movies
        String url = "https://api.themoviedb.org/3/discover/movie?api_key="
                + apiKey +
                (genreId.isEmpty() ? "" : "&with_genres=" + genreId) +
                "&sort_by=popularity.desc" +
                "&vote_count.gte=100"; // Ensures we get movies with enough votes

        try {
            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode results = root.path("results");

            if (results.size() == 0) {
                return "No movies found|Try a different genre!|";
            }

            Random random = new Random();
            int randomIndex = random.nextInt(results.size());

            JsonNode movie = results.get(randomIndex);

            String title = movie.path("title").asText();
            String overview = movie.path("overview").asText();
            String posterPath = movie.path("poster_path").asText();

            // Construct full poster URL
            String posterUrl = "";
            if (posterPath != null && !posterPath.isEmpty() && !posterPath.equals("null")) {
                posterUrl = IMAGE_BASE_URL + posterPath;
            }

            // Return data in format: title|overview|posterUrl
            return title + "|" + overview + "|" + posterUrl;

        } catch (Exception e) {
            e.printStackTrace();
            return "Error|Sorry, couldn't get a recommendation right now. Please try again.|";
        }
    }

    private String mapGenreToId(String genre) {
        return switch (genre.toLowerCase()) {
            case "action" -> "28";
            case "comedy" -> "35";
            case "drama" -> "18";
            case "horror" -> "27";
            case "romance" -> "10749";
            case "sci-fi", "sci fi", "scifi" -> "878";
            case "thriller" -> "53";
            case "animation" -> "16";
            case "fantasy" -> "14";
            case "crime" -> "80";
            case "mystery" -> "9648";
            case "adventure" -> "12";
            case "family" -> "10751";
            default -> ""; // empty = unknown genre, pick from all
        };
    }
}