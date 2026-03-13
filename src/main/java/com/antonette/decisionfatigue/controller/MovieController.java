package com.antonette.decisionfatigue.controller;

import com.antonette.decisionfatigue.service.MovieService;
import  org.springframework.web.bind.annotation.*;

@RestController
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/recommend")
    public String recommendMovie(
            @RequestParam String mood,
            @RequestParam int time) {

        return movieService.getMovie(mood,time);
    }
}
