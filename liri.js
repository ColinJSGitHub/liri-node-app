// requires the keys.js file which has our various input keys
var keys = require("./keys.js");

// requires the Request node package we installed
var request = require("request");

// requires the Spotify node package we installed
var spotify = require("spotify");

// requires the Twitter node package we installed
var twitter = require("twitter");

// defines the first user input in the command prompt after "node liri.js"
// this will be used to determine which command is performed; either the Twitter function,
// the Spotify function, the IMDB function, or the Do-What-It-Says function (which pulls info from random.txt
// and runs one of the given functions. We'll use the Spotify function for reference.)
var userInput = process.argv[2];

var userInputTwo = process.argv[3];

if (userInput === "my-tweets") {

};

if (userInput === "spotify-this-song") {

};

if (userInput === "movie-this") {

	request("http://www.omdbapi.com/?t="+ userInputTwo +"&y=&plot=short&r=json", function(error, response, body) {

  	// If the request is successful (i.e. if the response status code is 200)
  	if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the title, release year, country of origin, language,
    // plot, actors, rotten tomatoes rating,imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log(body);
    console.log("The movie's title is: " + JSON.parse(body).Title);
    console.log("The movie's release year is: " + JSON.parse(body).Year);
    console.log("The movie's country of origin is: " + JSON.parse(body).Country);
    console.log("The movie's language formats are: " + JSON.parse(body).Language);
    console.log("Plot Summary: " + JSON.parse(body).Plot);
    console.log("The major actors starring in this movie are: " + JSON.parse(body).Actors);
    console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
};

if (userInput == "do-what-it-says") {

}