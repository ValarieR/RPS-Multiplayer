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

    var firstTimeConvert;
    var minsAway;
    var tRemain;

    // console.log("First Train Time: " + firstTimeConvert);
    // console.log("Next Train: " + minsAway);

    var nextArrival;
    //console.log("Next Arrival: " + nextArrival);

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
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTime = $("#first-time-input").val().trim();
        frequency = $("#frequency-input").val().trim();


        // logs to be sure the above worked
        console.log(name);
        console.log(destination);
        console.log(firstTime);
        console.log(frequency);

        // Firebase Info
        database.ref('/Trains').push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
            // Close of Firebase Info
        });


        // Clear previous inputs
        function clearFields() {
            $(".form-control").val("");
        }

        clearFields();
        // nextArrivalTime();
        // minutesAway();

        // Closing of on click 
    });


	

    // Function to add all the data to Firebase
    database.ref().orderByChild("dateAdded").limitToLast(8).on("child_added", function(snapshot) {

    	sv = snapshot.val();
    	console.log(sv);

    	// Function to calc Next Arrival
    	function nextArrivalTime() {

    		firstTimeConvert = moment(sv.firstTime, "HH:mm");
    		console.log(firstTimeConvert);

    		minsAway = moment().diff(moment(firstTimeConvert), "minutes");
    		console.log(minsAway);

    		tRemain = minsAway % sv.frequency;
    		console.log(tRemain);

    		nextArrival = moment().add(minsAway, "minutes");
    			console.log("Next Arrival: " + nextArrival);

    		if (moment(rightNow).isBefore(firstTimeConvert)) {
    			nextArrival = moment(sv.firstTime, "minutes");
    			console.log(nextArrival);
    			minsAway = moment().diff(moment(firstTimeConvert), "minutes");
    			console.log(minsAway);
    		}
    		else {
    			tRemain = minsAway % sv.frequency;
    			console.log(tRemain);
    			minsAway = sv.frequency - tRemain;
    			console.log(minsAway);
    			nextArrival = moment().add(minsAway, "minutes");
    			console.log(nextArrival);
    		}

    		console.log("First Train Time: " + firstTimeConvert);
    		console.log("Next Train: " + minsAway);

    	}


	// Functions for populating the table
		var tTr = $("<tr>");

        var tTd = $("<td>");
        tTd.append(sv.name);
        tTr.append(tTd);
        console.log(sv.name);

        tTd = $("<td>");
        tTd.append(sv.destination);
        tTr.append(tTd);
        console.log(sv.destination);
        nextArrivalTime();

        tTd = $("<td>");
        tTd.append(sv.frequency);
        tTr.append(tTd);
        console.log(sv.frequency);

        tTd = $("<td>");
        tTd.append(moment(nextArrival).format("hh:mm A"));
        tTr.append(tTd);
        console.log(nextArrival);

        tTd = $("<td>");
        tTd.append(minsAway);
        tTr.append(tTd);
        console.log(minsAway);

        //Append New rows to employee tables body
        $("#input-table-body").append(tTr);
    });



    // // Closing of Firebase data add function
    // })

    // Closing of doc ready
});