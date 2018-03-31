require("dotenv").config();

const Spotify = require("node-spotify-api");
const request = require("request");
const Twitter = require('twitter');
const keys = require('./keys');
var express = require('express');
var config = require('./config.js');



let functionName = process.argv[2];
let functionArgument = process.argv[3];

var router = express.Router(); 
var spotify = new Spotify (keys.spotifyKeys);


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

function myTweets() {

var T = new Twitter(config);

var params = {
    q: 'Jones2813308004',
    count: 20,
    result_type: 'recent',
}

T.get('search/tweets', params, function (err, data, response) {

    if (!err) {

        for (let i = 0; i < data.statuses.length; i++) {

            let id = { id: data.statuses[i].id_str }

            console.log(JSON.stringify(data.statuses[i].user.name));
            console.log(JSON.stringify(data.statuses[i].created_at, null, 10));
            console.log(data.statuses[i].text)
            console.log("=======================================")
        }
    }
});
}
        function spotifyThis(songName) {
            var spotify = new Spotify({
                id: "48d397ac09a74942811003efc299f4ca",
                secret: "f4fbb8101aef41499a6ac2cb3ed3ac0d"
            });
        
            spotify.search({
                type: 'track',
                query: ""})
                
        .then(function(data) {
            console.log("Artist: " + data.artists[0].name); 
            console.log("Song Name: " + data.name); 
            console.log("Spotify Link: " + data.external_urls.spotify); 
            console.log("Album Name: " + data.album.name);   
            }
        )};

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
