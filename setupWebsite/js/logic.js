var PARSE_APP_ID = "X9cQUkyFkubVnkM3s5RBEadjPo4lEcBwnnMv0Vjf";
var PARSE_JAVASCRIPT_KEY = "rszotqzmclw1XxeInnfPbWHnEMyAPNUbBPerH36i";
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

function getUrlVarsFromString(url) {
	var vars = {};
	var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
		vars[key] = value;
	});
	return vars;
}

var tagID = getUrlVars()["tagID"];
console.log("Tag ID found: " + tagID);


function connectBtn() {
	newParseMovieID();
}

function newParseMovieID() {
	var Movies = Parse.Object.extend("Netflix_movies");
	var movieUpdate = new Movies();
	console.log("Movie ID: " + getUrlVarsFromString($("#movieID").val())["movieid"]);

	movieUpdate.set("movie_id", getUrlVarsFromString($("#movieID").val())["movieid"]);
	movieUpdate.set("key", tagID);

	movieUpdate.save(null, {
		success: function(movieUpdate) {
			// Execute any logic that should take place after the object is saved.
			$("#connectBtn").text("Done connecting");
			//alert('New connection created for Netflix movie ID' + movieUpdate.movieID);
		},
		error: function(gameScore, error) {
			// Execute any logic that should take place if the save fails.
			// error is a Parse.Error with an error code and description.
			alert('Failed to create new object, with error code: ' + error.description);
		}
	});
}