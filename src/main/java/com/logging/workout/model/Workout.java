package com.logging.workout.model;

import java.sql.Date;
import java.util.ArrayList;

public class Workout {
	
	private String type;
	private Date date;
	private Integer duration, cardioDuration; // Minutes

	private ArrayList<Exercise> exercises = new ArrayList<>();

	public ArrayList<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(ArrayList<Exercise> exercises) {
		this.exercises = exercises;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public Integer getCardioDuration() {
		return cardioDuration;
	}

	public void setCardioDuration(Integer cardioDuration) {
		this.cardioDuration = cardioDuration;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
}
