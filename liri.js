// requires the keys.js file which has our various input keys
var keys = require("./keys.js");

// requires the Request node package we installed
var request = require("request");

// requires the Spotify node package we installed
var spotify = require("spotify");

// requires the Twitter node package we installed
var Twitter = require("twitter");

// requires the FS node package we installed

var fs = require("fs");


// defines the first user input in the command prompt after "node liri.js"
// this will be used to determine which command is performed; either the Twitter function,
// the Spotify function, the IMDB function, or the Do-What-It-Says function (which pulls info from random.txt
// and runs one of the given functions. We'll use the Spotify function for reference.)
var userInput = process.argv[2];

// defines the second user input in the command prompt: this will be utilized for the Spotify and OMDB requests, where
// we put the name of the movie or song in question.
var userInputTwo = process.argv[3];


// should show my last 20 tweets and when they were created at in the terminal window. WARNING: the objects are gigantic!
if (userInput === "my-tweets") {

	console.log(keys);

	var client = new Twitter({
  	consumer_key: keys.twitterKeys.consumer_key,
  	consumer_secret: keys.twitterKeys.consumer_secret,
  	access_token_key: keys.twitterKeys.access_token_key,
  	access_token_secret: keys.twitterKeys.access_token_secret,
});
 
var params = {screen_name: 'Colin Stone'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
})

};

// Should show following info for the song you use as argv[3]: Artist(s), Song's Name, Preview link from spotify, Album of the song
// if no song is provided, defaults to "The Sign" by Ace of Base
if (userInput === "spotify-this-song") {
 
 	if (!userInputTwo) {
 			spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			return;
    			}
    		console.log("You didn't enter any song title in your search!");
 			console.log("Name of default song: " + data.tracks.items[0].name);
 			console.log("Artists of default song: " + data.tracks.items[0].artists.name);
 			console.log("Album of a song: " + data.tracks.items[0].album.name);
 			console.log("Preview link of first search result song: " + data.tracks.items[0].preview_url);
			});
 		}

 	else {		
			spotify.search({ type: 'track', query: userInputTwo }, function(err, data) {
    			if ( err ) {
        			console.log('Error occurred: ' + err);
        			return;
    			}
 			console.log("Name of first search result song: " + data.tracks.items[0].name);
 			console.log("Artists of first search result song: " + data.tracks.items[0].artists.name);
 			console.log("Album of first search result song: " + data.tracks.items[0].album.name);
 			console.log("Preview link of first search result song: " + data.tracks.items[0].preview_url); 
			});
		};


if (userInput === "movie-this") {

	request("http://www.omdbapi.com/?t="+ userInputTwo +"&y=&plot=short&r=json", function(error, response, body) {

  	// If the request is successful (i.e. if the response status code is 200)
  	if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the title, release year, country of origin, language,
    // plot, actors, rotten tomatoes rating,imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
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

// Using the "fs" Node package, should take the text inside of random.txt and then use it to call one of LIRI's commands.
if (userInput == "do-what-it-says") {

}

//BONUS- Cause all of these to output data to append to a .txt file called "log.txt"
// Should append each command you run to the "log.txt" file.
// Do not overwrite your file each time you run a command.