require("dotenv").config();

const Spotify = require("spotify")
const request = require("request");
const Twitter = require('twitter');

let functionName = process.argv[2];
let functionArgument = process.argv[3];


function omdb(movieName) {
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

    
    
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function spotifyThis(artistName) {
    console.log("Artist Name: " + artistName);
    var queryUrl = "https://api.spotify.com/v1/search?q=" + artistName + '&type=artist&limit=1';

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {

        }



    });
}

function myTweets(twit) {
    var twit = "search/tweets"  {q: 'pshehan'}, function(error, tweets, response) {
        console.log(twit);

        });



    };




function runFunct() {
    switch (functionName) {
        case "movie-this":
            omdb(functionArgument);
            break;
        case "spotify-this":
            spotifyThis(functionArgument);
            break;
        case "my-tweets":
        myTweets(functionArgument);

            break;
    }
}

runFunct();
