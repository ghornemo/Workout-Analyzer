/**
 * REST Web Service to allow user to create new workout.
 */

package com.logging.workout.controller.webservices;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.logging.workout.model.Workout;

@RestController
public class AddNewWorkout {
	
	@Autowired
	private RetrieveWorkoutData data;
	
	@RequestMapping("/addData")
	public @ResponseBody String greeting(@RequestBody Workout newWorkout) {
		data.getWorkouts().add(newWorkout);
		return "[{}]";
	}

}
