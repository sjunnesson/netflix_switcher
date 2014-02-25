var applescript = require("applescript");
var Kaiseki = require('kaiseki');


var PARSE_APP_ID = "X9cQUkyFkubVnkM3s5RBEadjPo4lEcBwnnMv0Vjf";
var PARSE_REST_KEY = "vinuIKiTgQdSi7RDDGZGPUxaIXVaGMVl7qaKktpw";
var kaiseki = new Kaiseki(PARSE_APP_ID, PARSE_REST_KEY);


function launchStream(stream) {
	var script = 'tell application "Google Chrome" \r activate \r set windowList to every tab of every window whose URL starts with "http://www.netflix.com" \r repeat with tabList in windowList \r set tabList to tabList as any \r repeat with tabItr in tabList \r set tabItr to tabItr as any \r delete tabItr \r end repeat \r end repeat \r open location "http://www.netflix.com/WiPlayer?movieid=' + stream + '" \r tell window 1 to enter presentation mode \r end tell';

	applescript.execString(script, function(err, rtn) {
		if (err) {
			console.log(err); // Something went wrong!
		}
	});
}

function getNetflixID(key) {
	var params = {
		where: {
			key: key
		}
	};
	kaiseki.getObjects("Netflix_movies", params, function(err, res, body, success) {
		if (success) {
			console.log('found object = ', body);
			if (body.length > 0) {
				launchStream(body[0].movie_id);
			}else{
				console.log("Key not found in parse");
				launchSetupPage(key);
			}
		}
	});
}

function launchSetupPage(key){
		var script = 'tell application "Google Chrome" \r activate \r set windowList to every tab of every window whose URL starts with "http://sjunnesson.github.io/netflix_switcher/setupWebsite/" \r repeat with tabList in windowList \r set tabList to tabList as any \r repeat with tabItr in tabList \r set tabItr to tabItr as any \r delete tabItr \r end repeat \r end repeat \r open location "http://sjunnesson.github.io/netflix_switcher/setupWebsite/?tagID=' + key + '" \r  end tell';

	applescript.execString(script, function(err, rtn) {
		if (err) {
			console.log(err); // Something went wrong!
		}
	});

}

getNetflixID("1590");

// setInterval(function() {
// //	getNetflixID("2");
// }, 10000);