package com.antonette.decisionfatigue.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.security.cert.CertPathBuilderResult;
import java.util.Random;

@Service
public class MovieService {

    // read from application.yml
    @Value("${tmdb.apiKey}")
    private String apiKey;

    public String getMovie(String mood) {

        // request data from other servers
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://api.themoviedb.org/3/discover/movie?api_key="
                + apiKey +
                "&sort_by=popularity.desc";

        try {
            String response = restTemplate.getForObject(url,String.class);

            // parse JSON
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);

            // Pick random movie
            JsonNode results = root.path("results");

            Random random = new Random();
            int randomIndex = random.nextInt(results.size());

            JsonNode movie = results.get(randomIndex);

            String title = movie.path("title").asText();
            String overview = movie.path("overview").asText();

            return "🎬 Recommendation: " + title + "\n" + overview;
        }
        catch (Exception e) {
            e.printStackTrace();
            return "Sorry, couldn't get a recommendation right now.";
        }
    }
}
