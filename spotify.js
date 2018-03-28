var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: S48d397ac09a74942811003efc299f4ca,
  secret: f4fbb8101aef41499a6ac2cb3ed3ac0d
});

var songName = process.argv[3]; 

 params = songName;
    spotify.search({ type: 'track', query: params }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;  
        }
        else{
            space + "Song Name: " + "'" +songName.toUpperCase()+ "'" +
            space + "Album Name: " + data.tracks.items[0].album.name +
            space + "Artist Name: " + data.tracks.items[0].album.artists[0].name +  
            space + "URL: " + data.tracks.items[0].album.external_urls.spotify + "\n\n\n";
            console.log(output);    
            };
    });