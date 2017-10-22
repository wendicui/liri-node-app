var request = require('request');
var fs = require('fs');

var object = {
	type:"Fiat", 
	model:"500", 
	color:"white"

}

console.log(object)
//user input
var input = process.argv
//change user input into searchable contents
var search = input[3]

for (var i = 4; i < input.length; i++) {
	search += `+${input[i]}`
}

//console.log(search)

//input api key
var keys = require('./key.js')
var moviekey = keys.moviekey


//check which command line is running
switch(input[2]){

	case "movie-this":
		movie(search);
		break;

	case "spotify-this-song":
		spotify(search);
		break;

	case "my-tweets":
		tweet(search);
		break;
	case "do-what-it-says":
		random(search);
		break;

}


function movie(search){

	request(`http://www.omdbapi.com/?t=${search}&apikey=${moviekey}`, function(error, response, body){
		 if (!error && response.statusCode === 200) {
   		
   			 var content = JSON.parse(body)
   			 //check whether it is a movie
   			 if(content.Title){
	   			 console.log("-------MOVIE ------")

	   			 var result = {


	   			 }
			
	   			 console.log(`Title is: ${content.Title}`);
	   			 console.log(`Year is: ${content.Year}`);
	   			 console.log(`IMDB Rating is: ${content.Ratings[0].Value}`);
	   			 console.log(`Rotton Tomatoes Rating is: ${content.Ratings[1].Value}`);
	   			 console.log(`Country produced is: ${content.Country}`);
	   			 console.log(`Language is: ${content.Language}`);
	   			 console.log(`Plot is: ${content.Plot}`);
	   			 console.log(`Actors are: ${content.Actors}`);

	   			 console.log("-----------------")
	   		}else{ movie('Mr-Nobody')} 
    }
	})
}


