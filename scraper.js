//Importing various modules
//Be sure to run npm install in  this directory
var scrap = require('youtube-captions-scraper');
const youtubedl = require('youtube-dl')
const ObjectsToCsv = require('objects-to-csv');
var fetch = require('fetch')
var fs = require('fs');


var dir = './chapters';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}

dir = './subtitles';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}
//Loading the my API key from a javascript file
//Be sure to create a key.js file in the same directory as this file with your API key in it
var key = require('./keys.js');

//Loading the key into this file
const API_KEY = process.env.REACT_APP_YT_API_KEY || key.API_KEY_YOUTUBE;

//I have a array here of some playlist ids
//I choose them primarily from the Gothamchess channel due to the many videos he has chaptered
//We can easily just add new ids to this list to generate more training data
playlistIds  = ["PLBRObSmbZluTCoqlOg-3wEdlyRQLAJ2gs","PLBRObSmbZluTIm2KhiuLquoKdNjaU66hS","PLBRObSmbZluTCoqlOg-3wEdlyRQLAJ2gs","PLBRObSmbZluQ-9Wnwy_7Apm9gZn2gZH_r"]

//I iterate through all the playlist ids
for (playlists in playlistIds) {

  //Creating the API call by considering the current video playlist id
  URL = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=" + playlistIds[playlists]

  //We will get this url and retrieve the object
  fetch.fetchUrl(URL + "&key=" + API_KEY, function(error, meta, body){
  
    //Body will be the object that is returned upon fetching the url
    body = JSON.parse(body.toString());
   
    //We will get the items from the object that will have all the youtube videos in the playlist
    items = body["items"];
    
    //We iterate through all the videos in the playlist
    for (i = 0; i < items.length; i++) {
      
      //We then get the subtitles for each video
      getSubs(items[i].contentDetails.videoId);

      //Getting chapters for each video
      getChapters(items[i].contentDetails.videoId);
    }
  
  

});



}




// Code will get subtitles for a video and download to a csv file
function getSubs(videoId) {

  //We use the getSubtitles method from the youtube-captions-scraper moduel
  scrap.getSubtitles({
    videoID: String(videoId), // youtube video id
    lang: 'en' // default: `en`
  }).then(captions => {

    //Ensure we write a file with captions to disk
    if (typeof captions === 'object' && captions !== null) {
      (async () => {

        //Convert the captions to a csv format
        const csv = new ObjectsToCsv(captions);
        
        //Then generate a csv file with this data with the name videoID.csv so each file has a unique name
        await csv.toDisk('./subtitles/' + videoId + '.csv', { append: false });
       
      })();
    }
    
  });
}

//This funtion will get the video chapters for a video based on a ID and save this data to a csv
function getChapters(videoID) {

  //We will build the url for this
  const url = 'https://www.youtube.com/watch?v=' + videoID;

  // // Optional arguments passed to youtube-dl.
  const options = ['--write-info-json'];

  //We will use the youtubedl module as we can easily get video chapters
  youtubedl.getInfo(url, options, function(err, info) {
    if (err) return null;

    //Collect only the chapters from the returned object
    var chapters = info.chapters;
    
    //Ensure that chapters does exist to prevent errors
    if (typeof chapters === 'object' && chapters !== null) {
      (async () => {

        const csv = new ObjectsToCsv(chapters);

        //Save the chapter data to a csv file under the name videoID.csv
        await csv.toDisk('./chapters/' + videoID + '.csv', { append: false });
      
      })();
    }
    
    
  })

}


