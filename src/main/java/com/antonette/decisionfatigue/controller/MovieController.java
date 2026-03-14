package com.antonette.decisionfatigue.controller;

import com.antonette.decisionfatigue.service.MovieService;
import  org.springframework.web.bind.annotation.*;

// this class returns API responses

@RestController
public class MovieController {

    // debugging
    @RestController
    public class TestController {
        @GetMapping("/hello")
        public String hello() {
            return "Hello Antonette!";
        }
    }

    // real API endpoint
    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/recommend")
    public String recommendMovie(@RequestParam(name="mood") String mood) {
        return movieService.getMovie(mood);
    }
}
