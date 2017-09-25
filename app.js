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
        name = $("name-input").val();
        destination = $("destination-input").val();
        firstTime = $("first-time-input").val();
        frequency = $("frequency-input").val();

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
            // Close of Firebase Info
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
    		nextArrival = firstTime + frequency;

    		console.log(nextArrival);
    	}


    // Function to calc Minutes away
    	function minutesAway() {

    	}


	

    // Function to add all the data to Firebase
    database.ref().orderByChild("dateAdded").limitToLast(8).on("child_added", function(snapshot) {

    	sv = snapshot.val();
    	console.log(sv);



    // Closing of Firebase data add function
    })

    // Closing of doc ready
});