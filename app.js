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

    var nextArrival;

    var sv;
    var rightNow = moment();

    console.log("CURRENT TIME IS: " + moment(rightNow).format("hh:mm"));


    // Function for submit button
    $("#add-train").on("click", function() {

        event.preventDefault();

        // Define some variables
        name = $("#name-input").val().trim();
        destination = $("#destination-input").val().trim();
        firstTime = $("#first-time-input").val().trim();
        frequency = $("#frequency-input").val().trim();


        // logs to be sure the above worked
        console.log("Train: " + name);
        console.log("Dest: " + destination);
        console.log("First Depart: " + firstTime);
        console.log("How Often: " + frequency);

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

        // Closing of on click 
    });

    // Function to calc Next Arrival
    	function nextArrivalTime() {

    		firstTimeConvert = moment(sv.firstTime, "HH:mm");
    		console.log("Converted Time: " + firstTimeConvert);

    		minsAway = moment().diff(moment(firstTimeConvert), "minutes");
    		console.log("Mins Away: " + minsAway);

    		tRemain = minsAway % sv.frequency;
    		console.log("Time Remaining: " + tRemain);

    		nextArrival = moment().add(minsAway, "minutes");
    			console.log("Next Arrival: " + nextArrival);

    		if (moment(rightNow).isBefore(firstTimeConvert)) {
    			nextArrival = moment(sv.firstTime, "minutes");
    			console.log("Next Arr: " + nextArrival);
    			minsAway = moment().diff(moment(firstTimeConvert), "minutes");
    			console.log("Mins Away Calc: " + minsAway);
    		}
    		else {
    			tRemain = minsAway % sv.frequency;
    			console.log("Time Re Calc: " + tRemain);
    			minsAway = sv.frequency - tRemain;
    			console.log("Mins Away: " + minsAway);
    			nextArrival = moment().add(minsAway, "minutes");
    			console.log("Next Arr Calc: " + nextArrival);
    		}
    	};
	
	function dbRef(){
    // Function to add all the data to Firebase
    database.ref('/Trains').orderByChild("dateAdded").limitToLast(3).on("child_added", function(snapshot) {

    	sv = snapshot.val();
    	console.log(sv);

    	nextArrivalTime();
    	updateTable();

    	})
	};

    // Function to update table

    function refreshTableInfo() {

    	console.log("working");

    	$("#input-table-body").empty();

    	dbRef();
    }

    // call to run a specific function every 30 seconds
    setInterval(function(){ refreshTableInfo() 
    	}, 30000);


	//Function for table that can be called on interval to refresh table

	function updateTable() {

		// populating the table
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
    };

    // Call the fnc to populate the table
    dbRef();
    
    // Closing of doc ready
});