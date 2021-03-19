//Scrapper file I use to get data
var scrap = require('youtube-captions-scraper');
const youtubedl = require('youtube-dl')
const ObjectsToCsv = require('objects-to-csv');
var fetch = require('fetch')
var key = require('./keys.js');

const API_KEY = process.env.REACT_APP_YT_API_KEY || key.API_KEY_YOUTUBE;

listofurls  = ["PLBRObSmbZluTCoqlOg-3wEdlyRQLAJ2gs","PLBRObSmbZluTIm2KhiuLquoKdNjaU66hS","PLBRObSmbZluTCoqlOg-3wEdlyRQLAJ2gs","PLBRObSmbZluQ-9Wnwy_7Apm9gZn2gZH_r"]
//getting a bunch of video ids, the idea is that we can use these to train on tons of data

for (videos in listofurls) {

  
  URL = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=" + listofurls[videos]
  fetch.fetchUrl(URL + "&key=" + API_KEY, function(error, meta, body){
  
    test = []
    body = JSON.parse(body.toString());
    
    is = body["items"];
    
    for (i = 0; i < is.length; i++) {
      test.push(is[i].contentDetails.videoId);

      getSubs(is[i].contentDetails.videoId);
      returnChaps(is[i].contentDetails.videoId);
    }
  
  

});



}



// console.log(jsa.chapters)
// Code will get subtitles for a video and return
// TODO: Save these along with the chapter locations to some data format we can get from python
function getSubs(videoId) {
  scrap.getSubtitles({
    videoID: String(videoId), // youtube video id
    lang: 'en' // default: `en`
  }).then(captions => {

    if (typeof captions === 'object' && captions !== null) {
      (async () => {

      
        const csv = new ObjectsToCsv(captions);
        //const csv = new ObjectsToCsv(data);
        await csv.toDisk('./subtitles/' + videoId + '.csv', { append: false });
       
      })();
    }
    
  });
}


function returnChaps(videoID) {
  // //Will track the url
  const url = 'https://www.youtube.com/watch?v=' + videoID;
  // // Optional arguments passed to youtube-dl.
  const options = ['--write-info-json'];


  youtubedl.getInfo(url, options, function(err, info) {
    if (err) return null;

    var data = info.chapters;
    
    if (typeof data === 'object' && data !== null) {
      (async () => {

        const csv = new ObjectsToCsv(data);
        //const csv = new ObjectsToCsv(data);
        await csv.toDisk('./chapters/' + videoID + '.csv', { append: false });
      
      })();
    }
    
    
  })

}


