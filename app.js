$(document).ready(function() {

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

    var sv;
    var rightNow = moment();

    console.log("CURRENT TIME: " + moment(rightNow).format("hh:mm"));


    // Function to enable military time
    // $(function () {
    //     $('#first-time-input').datetimepicker({
    //          format: 'HH:mm',
    //          use24hours: true,
    //     });

    // });


    // Function for submit button
    $("#add-train").on("click", function() {

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

        // Firebase Info
        database.ref().push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
            // CLose of Firebase Info
        });


        // Clear previous inputs
        function clearFields() {
            $("name-input").val("");
            $("destination-input").val("");
            $("first-time-input").val("");
            $("frequency-input").val("");
        }

        clearFields();

        // Closing of on click 
    });

    // Function to calc Next Arrival
    	function nextArrivalTime() {
    		nextArrival = firstTime
    	}


    // Function to calc Minutes away
    	function minutesAway() {

    	}


	// First Time (pushed back 1 month to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "months");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % Frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = Frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Function to add all the data to Firebase
    database.ref().orderByChild("dateAdded").limitToLast(8).on("child_added", function(snapshot) {

    	sv = snapshot.val();
    	console.log(sv);



    // Closing of Firebase data add function
    })

    // Closing of doc ready
});