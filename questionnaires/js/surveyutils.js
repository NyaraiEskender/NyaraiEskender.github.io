
function initializeSurvey(surveyName, linkIdentifier) {

	var gets = document.URL.split("?");
	gets = gets[1].split("&");
	var argc = gets[0].split("=")[1];
	
	var id = "", age = -1, gender = "o";
	// The ID is always provided..
	id = gets[1].split("=")[1];
    id = id.replace(/%40/g, "@");
	if (argc > 1) { // and the rest is optional.
		age = gets[2].split("=")[1];
		gender = gets[3].split("=")[1];
	}

	if (surveyName === 'surveymenu')
		document.getElementById("participantDetails").innerHTML = "Participant " + id;

	// var logFilename = getLogName(surveyName, argc, id, age, gender);
	// Set download attribute
    // $('#downloadResults').attr("download", logFilename);
	
	$(linkIdentifier).each(function(index, e) {
		rawLink = $(e).attr("href");
		newLink = rawLink + "?argc=" + argc + "&id=" + id;
		if (argc > 1) newLink += "&age=" + age + "&gender=" + gender;
		$(e).attr("href", newLink);
	});

    var userData = {
        "email": id,
        "age": parseInt(age),
        "gender": gender
    };

    return userData;
}

function getLogName(surveyName, argc, id, age, gender) {
    // Get a timestamp
    var month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
				 "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    var dt = new Date();

    // Normalize date, hours and minutes
    var date = dt.getDate();
    var dateStr = date.toString();
    if (date < 10)
    {
        dateStr = "0" + dateStr;
    }
    var hours = dt.getHours();
    var hoursStr = hours.toString();
    if (hours < 10)
    {
        hoursStr = "0" + hoursStr;
    }
    var mins = dt.getMinutes();
    var minsStr = mins.toString();
    if (mins < 10)
    {
        minsStr = "0" + minsStr;
    }

    var timestamp = dateStr + "" + month[dt.getUTCMonth()]+ "" + dt.getFullYear() + "_" + hoursStr +  minsStr;

    var logFileName = surveyName + "_p" + id;
	if (argc > 1) logFileName += "_" + age + "_" + gender;
	logFileName += "_" + timestamp + ".txt";

    console.log(logFileName);
    return logFileName
}



