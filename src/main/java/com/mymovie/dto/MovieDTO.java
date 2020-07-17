package com.mymovie.dto;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.util.List;

@Entity
public class MovieDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int primId;
	private int userId;
	private boolean adult;
	private String backdrop_path;
	private String fav;
	private int id;
	private String original_language;
	private String original_title;
	@Column(length = 10000)
	private String overview;
	private String popularity;
	private String poster_path;
	private String release_date;
	private String title;
	private String video;
	private String vote_average;
	private String vote_count;
	@ElementCollection
	private List<Integer> genre_ids;


	public MovieDTO(){};

	public int getPrimId() {
		return primId;
	}

	public void setPrimId(int primId) {
		this.primId = primId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public boolean isAdult() {
		return adult;
	}

	public void setAdult(boolean adult) {
		this.adult = adult;
	}

	public String getBackdrop_path() {
		return backdrop_path;
	}

	public void setBackdrop_path(String backdrop_path) {
		this.backdrop_path = backdrop_path;
	}

	public String getFav() {
		return fav;
	}

	public void setFav(String fav) {
		this.fav = fav;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOriginal_language() {
		return original_language;
	}

	public void setOriginal_language(String original_language) {
		this.original_language = original_language;
	}

	public String getOriginal_title() {
		return original_title;
	}

	public void setOriginal_title(String original_title) {
		this.original_title = original_title;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getPopularity() {
		return popularity;
	}

	public void setPopularity(String popularity) {
		this.popularity = popularity;
	}

	public String getPoster_path() {
		return poster_path;
	}

	public void setPoster_path(String poster_path) {
		this.poster_path = poster_path;
	}

	public String getRelease_date() {
		return release_date;
	}

	public void setRelease_date(String release_date) {
		this.release_date = release_date;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public String getVote_average() {
		return vote_average;
	}

	public void setVote_average(String vote_average) {
		this.vote_average = vote_average;
	}

	public String getVote_count() {
		return vote_count;
	}

	public void setVote_count(String vote_count) {
		this.vote_count = vote_count;
	}

	public List<Integer> getGenre_ids() {
		return genre_ids;
	}

	public void setGenre_ids(List<Integer> genre_ids) {
		this.genre_ids = genre_ids;
	}

	public MovieDTO(int primId, int userId, boolean adult, String backdrop_path, String fav, int id, String original_language, String original_title, String overview, String popularity, String poster_path, String release_date, String title, String video, String vote_average, String vote_count, List<Integer> genre_ids) {
		this.primId = primId;
		this.userId = userId;
		this.adult = adult;
		this.backdrop_path = backdrop_path;
		this.fav = fav;
		this.id = id;
		this.original_language = original_language;
		this.original_title = original_title;
		this.overview = overview;
		this.popularity = popularity;
		this.poster_path = poster_path;
		this.release_date = release_date;
		this.title = title;
		this.video = video;
		this.vote_average = vote_average;
		this.vote_count = vote_count;
		this.genre_ids = genre_ids;
	}

	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}

}
