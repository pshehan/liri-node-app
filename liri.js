require("dotenv").config();

var spotify = require ("spotify");
const request = require("request");
const Twitter = require('twitter');
var express = require('express');
var config = require('./config.js');



let functionName = process.argv[2];
let functionArgument = process.argv[3];

var router = express.Router();


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

function spotifyThisSong(songName) {
    var songName = process.argv[3];

    params = songName;

    console.log("You searched for: " + songName);


    spotify.search({
        type: 'track',
        query: params,
      }, function (err, songInfo) {
        if (err) {
          console.log("You Searched For: The Sign");
          console.log("Artist: Ace of Base");
          console.log("Song Title: I Saw the Sign");
          console.log("Preview Link of Song: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
          console.log("Album: The Sign (US Album) [Remastered]");
        }
        var songInfo = info.tracks.items[0];
        console.log("Artist: " + info.artists[0].name);
        console.log("Song Title: " + info.name);
        console.log("Preview Link of Song: " + info.external_urls.spotify);
        console.log("Album: " + info.album.name);
      });
    }


function runFunct() {
    switch (functionName) {
        case "movie-this":
            omdb(functionArgument);
            break;
        case "spotify-this-song":
            spotifyThisSong(functionArgument);
            break;
        case "my-tweets":
            myTweets(functionArgument);

            break;
    }
}

runFunct();
