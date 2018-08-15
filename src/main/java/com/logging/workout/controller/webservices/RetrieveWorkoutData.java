package com.logging.workout.controller.webservices;

import java.sql.Date;
import java.util.ArrayList;

import javax.annotation.PostConstruct;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.SessionScope;

import com.logging.workout.model.Exercise;
import com.logging.workout.model.Workout;

@SessionScope
@RestController
public class RetrieveWorkoutData {
	
	private ArrayList<Workout> workouts = new ArrayList<>();
	
	//TODO: Load workout data from DB. Currently using hard-coded data.
	@PostConstruct
	public void init() {
		
		Exercise benchPress = new Exercise();
		benchPress.setName("bench press");
		benchPress.setReps(10);
		benchPress.setWeight(100);
		benchPress.setSets(4);
		
		Exercise chestFlies = new Exercise();
		chestFlies.setName("chest fly");
		chestFlies.setReps(15);
		chestFlies.setWeight(75);
		chestFlies.setSets(3);

		Workout workout1 = new Workout();
		workout1.setCardioDuration(15);
		workout1.setDuration(45);
		workout1.setType("chest");
		workout1.setDate(new Date(System.currentTimeMillis()));
		workout1.getExercises().add(benchPress);
		workout1.getExercises().add(chestFlies);
		
		workouts.add(workout1);
		
	}
    
	@RequestMapping("/retrieveData")
	public ArrayList<Workout> greeting() {
		return workouts;
    }
	public ArrayList<Workout> getWorkouts() {
		return workouts;
	}
}
