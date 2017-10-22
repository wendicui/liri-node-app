var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api')
//help write data to log.txt
var result


//user input
var input = process.argv
//change user input into searchable contents for imdb
var searchimdb = input[3]

for (var i = 4; i < input.length; i++) {
	searchimdb += `+${input[i]}`
}
//console.log(search)
var searchspotify = ''

for (var i = 3; i < input.length; i++) {
	searchspotify += `${input[i]} `
}



//input api key
var keys = require('./key.js')
var moviekey = keys.moviekey
var spotifykey = keys.spotifykey
var spotifyid = keys.spotifyid

//check which command line is running
function check(data ){
	switch(data){

		case "movie-this":
			movie(searchimdb);
			break;

		case "spotify-this-song":
			spot(searchspotify);
			break;

		case "my-tweets":
			tweet(search);
			break;
		case "do-what-it-says":
			order();
			break
	}
}
check(input[2]);

function append(content){
	fs.appendFile('log.txt', `Command:\n${input[2]} ${searchspotify}\nResult:\n${content}\n\n\n`, function(err){
		if(err){console.log(err)}
		else{
			console.log("go find data")
		}
	})
}

function movie(search){

	request(`http://www.omdbapi.com/?t=${search}&apikey=${moviekey}`, function(error, response, body){
		 if (!error && response.statusCode === 200) {
   		
   			 var content = JSON.parse(body)
   			 //check whether it is a movie
   			 if(content.Title){
	   			 console.log("-------MOVIE ------")

	   			result = body
	   			//console.log(result)
			
	   			 console.log(`Title is: ${content.Title}`);
	   			 console.log(`Year is: ${content.Year}`);
	   			 console.log(`IMDB Rating is: ${content.Ratings[0].Value}`);
	   			 console.log(`Rotton Tomatoes Rating is: ${content.Ratings[1].Value}`);
	   			 console.log(`Country produced is: ${content.Country}`);
	   			 console.log(`Language is: ${content.Language}`);
	   			 console.log(`Plot is: ${content.Plot}`);
	   			 console.log(`Actors are: ${content.Actors}`);

	   			 console.log("-----------------")


	   			 append(result);


	   		}else{ movie('Mr-Nobody')} 
    }
	})

}


function spot(userInput){
	var spotify = new Spotify({
								id: spotifyid,
								secret: spotifykey
							});
	console.log(userInput)
	spotify.search({ type: 'track', 
					query: userInput,
					limit: 1 }, function(err, data) {

			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
 
				result = data.tracks.items[0];

				console.log("-------SONG ------")

				console.log(`Song's Name is: ${userInput}`)
				console.log(`Artist is: ${result.artists[0].name}`)
				console.log(`The Album is: ${result.album.name}`)
				console.log(`The link is: ${result.external_urls.spotify}`)
				
				console.log("-----------------")

				append(JSON.stringify(result));
				});

}


function order(){
	fs.readFile("random.txt", "utf8", function(err,data){
		if (err){ console.log(err)};

		var dataArrary = data.split(",")
		searchspotify = dataArrary[1];
		check(dataArrary[0])

	})
}


