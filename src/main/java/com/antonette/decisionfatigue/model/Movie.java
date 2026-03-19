package com.antonette.decisionfatigue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String title;

    private String overview;

    private String genre;

    // Default constructor (required)
    public Movie() {}

    // Constructor
    public Movie(String title, String overview, String genre) {
        this.title = title;
        this.overview = overview;
        this.genre = genre;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getOverview() { return overview; }
    public String getGenre() { return genre; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setOverview(String overview) { this.overview = overview; }
    public void setGenre(String genre) { this.genre = genre; }
}