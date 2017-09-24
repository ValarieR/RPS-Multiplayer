$(document).ready(function () {

// Initialize Firebase
	var config = {
    	apiKey: "AIzaSyD8m2Bom_2Uc21vEaHUnBQgHVLoHJnT4FA",
    	authDomain: "vr-project-7892d.firebaseapp.com",
    	databaseURL: "https://vr-project-7892d.firebaseio.com",
    	projectId: "vr-project-7892d",
    	storageBucket: "vr-project-7892d.appspot.com",
    	messagingSenderId: "1022819914597"
	  };

	firebase.initializeApp(config);

// Global variables

	var database = firebase.database();

	var name;
	var destination;
	var firstTime;
	var frequency;

	var nextArrival;
	var minsAway;


// Function to enable military time
$(function () {
    $('#first-time-input').datetimepicker({
         format: 'HH:mm',
         use24hours: true,
    });

});


// Function for submit button
	$("#add-train").on("click", function (){

		event.preventDefault();

	// Define some variables
		name = $("name-input").val().trim();
		destination = $("destination-input").val().trim();
		firstTime = $("first-time-input").val().trim();
		frequency = $("frequency-input").val().trim();

	// logs to be sure the above worked
		console.log(name);
		console.log(destination);
		console.log(firstTime);
		console.log(frequency);


// Closing of on click 
	});

// Closing of doc ready
});