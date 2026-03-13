package com.antonette.decisionfatigue.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {

    @Value("${tmdb.apiKey}")
    private String apiKey;

    public String getMovie(String mood, int time) {

        RestTemplate restTemplate = new RestTemplate();

        String url = "http://api.themoviedb.org/3/discover/movie?api_key="
                + apiKey +
                "&sort_by=popularity.desc";

        String response = restTemplate.getForObject(url,String.class);

        return response;
    }
}
