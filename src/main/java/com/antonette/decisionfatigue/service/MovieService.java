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

    public String getMovie(String genre) {

        RestTemplate restTemplate = new RestTemplate();

        // Map known genre to TMDB ID, empty string means "all genres"
        String genreId = mapGenreToId(genre);

        // If genre is unknown, we don't use "with_genres" (TMDB returns all popular movies)
        String url = "https://api.themoviedb.org/3/discover/movie?api_key="
                + apiKey +
                (genreId.isEmpty() ? "" : "&with_genres=" + genreId) +
                "&sort_by=popularity.desc";

        try {
            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode results = root.path("results");

            if (results.size() == 0) return "No movies found. Try a different genre!";

            Random random = new Random();
            int randomIndex = random.nextInt(results.size());

            JsonNode movie = results.get(randomIndex);

            String title = movie.path("title").asText();
            String overview = movie.path("overview").asText();

            return "🎬 Recommendation: " + title + "\n\n" + overview;

        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, couldn't get a recommendation right now.";
        }
    }

    private String mapGenreToId(String genre) {
        return switch (genre.toLowerCase()) {
            case "action" -> "28";
            case "comedy" -> "35";
            case "drama" -> "18";
            case "horror" -> "27";
            case "romance" -> "10749";
            case "sci-fi", "sci fi" -> "878";
            default -> ""; // empty = unknown genre, pick from all
        };
    }
}