
var app = angular.module('myApp', ['chart.js', 'zingchart-angularjs']);
app.controller('myCtrl', function($scope, $filter, $http) {
    //$scope.workouts = [
    //    {type:'shoulders',date:'jun 7, 2018', duration:45, cardioDuration: '15',
    //    	exercises:[
    //    		{name: 'military press', weight: 70, sets:3},
    //    		{name: 'shrugs', weight: 80, sets: 3},
    //    		{name: 'shoulder raises', weight: 20, sets:3} 
    //    	]
    //    },
    //    {type:'legs',date:'jun 12, 2018', duration:60, cardioDuration: '25',
    //    	exercises:[
    //    		{name: 'squat', weight: 200, sets:3},
    //    		{name: 'lunges', weight: 90, sets: 3},
    //    		{name: 'quad extensions', weight: 120, sets:3} 
    //    	]
    //    },
    //    {type:'legs',date:'jun 19, 2018', duration:60, cardioDuration: '25',
    //    	exercises:[
    //    		{name: 'squat', weight: 150, sets:3},
    //    		{name: 'lunges', weight: 90, sets: 3},
    //    		{name: 'quad extensions', weight: 120, sets:3} 
    //    	]
    //    },
    //    {type:'back',date:'jun 15, 2018', duration:50, cardioDuration: '10',
    //    	exercises:[
    //    		{name: 'deadlift', weight: 150, sets:3},
    //    		{name: 'chin up', weight: 'body-weight', sets: 3},
    //    		{name: 'seated row', weight: 50, sets:3} 
    //    	]
    //    }
    //];
    $http.get('http://localhost:8080/retrieveData').
    then(function(response) {
        $scope.workouts = response.data;
	    $scope.recalculateLineGraph();
	    $scope.recalculateExerciseNames();
	    $scope.recalculateExerciseFrequency();
    });
    $scope.newWorkout = {
			duration : 45,
			cardio : true,
			cardioDuration : 10,
        	exercises:[
        		{name: '', weight: '', sets:3}
        	]
        };
    $scope.newWorkout.date = new Date();
    $scope.addNewExercise = function(workout) {
    	$scope.newWorkout.exercises.push(
    			{name: '', weight: '', sets:3}
    			);
    }; 
    $scope.exerciseCount = function(exerciseName) {
    	return selectedCount = $filter('filter')($scope.workouts.exercises, { name: exerciseName }).length;
    }; 
    $scope.addNewWorkout = function() {
    	
    	//START: Integrate backend
		$http({
	        method : "POST",
	        url : "http://localhost:8080/addData",
	        data: JSON.stringify($scope.newWorkout)
	    }).then(function mySuccess(response) {
	    	$scope.workouts.push($scope.newWorkout);
	    	$scope.recalculateExerciseFrequency();
	    	swal({
                title: "Success",
                text: "Your workout has been added",
                type: "success"
            });
		    $scope.newWorkout = {
		            name : "workout",
				    date : "date",
					duration : 45,
		        	exercises:[
		        		{name: '', weight: '', sets:3}
		        	]
		        };
	    }, function myError(response) {
	        alert('HTTP error2: '+response);
	    });
    	//END: Integrate backend
    }; 
    $scope.selectWorkout = function(workout) {
        $scope.selectedWorkout = workout;
    };  
    $scope.labels = ['Full Body', 'Chest', 'Shoulders', 'Back', 'Arms', 'Legs', 'Cardio'];
    $scope.data = [3, 5, 6, 2, 1, 6, 1];
    $scope.recalculateExerciseFrequency = function() {
    	$scope.data.length = 0;
    	var fullBodyCount = $filter('filter')($scope.workouts, { type: 'Full Body' }).length;
    	var chestCount = $filter('filter')($scope.workouts, { type: 'Chest' }).length;
    	var shoulderCount = $filter('filter')($scope.workouts, { type: 'Shoulders' }).length;
    	var backCount = $filter('filter')($scope.workouts, { type: 'Back' }).length;
    	var armCount = $filter('filter')($scope.workouts, { type: 'Arms' }).length;
    	var legCount = $filter('filter')($scope.workouts, { type: 'Legs' }).length;
    	var cardioCount = $filter('filter')($scope.workouts, { type: 'Cardio' }).length;
    	$scope.data.push(fullBodyCount);
    	$scope.data.push(chestCount);
    	$scope.data.push(shoulderCount);
    	$scope.data.push(backCount);
    	$scope.data.push(armCount);
    	$scope.data.push(legCount);
    	$scope.data.push(cardioCount);
    }; 
    
    //Function is used to calculate statistics for focused exercise (graph).
    $scope.recalculateLineGraph = function() {
	    $scope.myJson.series[0].values.length = 0;
	    $scope.myJson.series[0].values.push(0);
	    $scope.exerciseOccurence = 0;
	    $scope.avgWeight = 0;
	    for(var i = 0; i < $scope.workouts.length; i++) {
	        var workout = $scope.workouts[i];
		    for(var j = 0; j < workout.exercises.length; j++) {
		    	var exercise = workout.exercises[j];
		    	var weight = exercise.weight;
		    	if(exercise.name === $scope.analyzedExercise) {
		    		$scope.exerciseOccurence++;
		    		$scope.avgWeight += weight;
		    		if($scope.exerciseOccurence == 1) {
		    			$scope.maxWeight = weight;
		    			$scope.minWeight = weight;
		    		} else {
		    			if($scope.maxWeight < weight) {
		    				$scope.maxWeight = weight;
		    			}
		    			if($scope.minWeight > weight) {
		    				$scope.minWeight = weight;
		    			}
		    		}
		    		$scope.myJson.series[0].values.push(exercise.weight);
		    	}
		    }
	    }
	    if($scope.exerciseOccurence > 1) {
	    	$scope.avgWeight /= $scope.exerciseOccurence;
	    }
    }
    $scope.names = [];
    //Function to calculate data for pie chart
    $scope.recalculateExerciseNames = function() {
    	$scope.names.length = 0;
    	var exerciseNames = new Set();
	    for(var i = 0; i < $scope.workouts.length; i++) {
	        var workout = $scope.workouts[i];
		    for(var j = 0; j < workout.exercises.length; j++) {
		    	var exercise = workout.exercises[j];
		    	exerciseNames.add(exercise.name);
		    }
	    }
	    
	    exerciseNames.forEach(name => {
	    	 $scope.names.push(name);
	    });
    }
    $scope.myJson = {  
    		  type : 'line' ,  
    		  series : [  
    		    { values : [] }
    		  ]  
    		}; 
});