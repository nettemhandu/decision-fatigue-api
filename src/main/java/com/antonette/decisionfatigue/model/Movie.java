package com.antonette.decisionfatigue.model;

public class Movie {

    private Long id;
    private String title;
    private String overview;
    private String genre;
    private String posterPath;
    private String releaseDate;
    private Double voteAverage;
    private Integer voteCount;

    // Default constructor
    public Movie() {}

    // Constructor with basic fields
    public Movie(String title, String overview, String genre) {
        this.title = title;
        this.overview = overview;
        this.genre = genre;
    }

    // Constructor for TMDB data
    public Movie(Long id, String title, String overview, String genre,
                 String posterPath, String releaseDate, Double voteAverage,
                 Integer voteCount) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.genre = genre;
        this.posterPath = posterPath;
        this.releaseDate = releaseDate;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getOverview() { return overview; }
    public String getGenre() { return genre; }
    public String getPosterPath() { return posterPath; }
    public String getReleaseDate() { return releaseDate; }
    public Double getVoteAverage() { return voteAverage; }
    public Integer getVoteCount() { return voteCount; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setOverview(String overview) { this.overview = overview; }
    public void setGenre(String genre) { this.genre = genre; }
    public void setPosterPath(String posterPath) { this.posterPath = posterPath; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }
    public void setVoteAverage(Double voteAverage) { this.voteAverage = voteAverage; }
    public void setVoteCount(Integer voteCount) { this.voteCount = voteCount; }
}