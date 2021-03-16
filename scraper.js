//Scrapper file I use to get data
var scrap = require('youtube-captions-scraper');
const youtubedl = require('youtube-dl')
const ObjectsToCsv = require('objects-to-csv');
var fetch = require('fetch')
import API_KEY_YOUTUBE from './keys.js'

const API_KEY = process.env.REACT_APP_YT_API_KEY || API_KEY_YOUTUBE;

//getting a bunch of video ids, the idea is that we can use these to train on tons of data
fetch.fetchUrl("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLWKjhJtqVAblvI1i46ScbKV2jH1gdL7VQ&key=" + API_KEY, function(error, meta, body){
  
  test = []
  body = JSON.parse(body.toString())
  
  is = body["items"]
  //console.log(is)
  for (i = 0; i < is.length; i++) {
    console.log(is[i].contentDetails.videoId)
    test.push(is[i].contentDetails.videoId)
  }
  
  

});



//console.log(jsa.chapters)
//Code will get subtitles for a video and return
// TODO: Save these along with the chapter locations to some data format we can get from python
// scrap.getSubtitles({
//     videoID: 'fqMOX6JJhGo', // youtube video id
//     lang: 'en' // default: `en`
//   }).then(captions => {
//     console.log(captions);

//     (async () => {

//       const csv = new ObjectsToCsv(captions);
//       //const csv = new ObjectsToCsv(data);
//       await csv.toDisk('./subtitles/subs.csv', { append: true });
     
//     })();
//   });

// //Will track the url
// const url = 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
// // Optional arguments passed to youtube-dl.
// const options = ['--write-info-json']


// youtubedl.getInfo(url, options, function(err, info) {
//   if (err) throw err

//   var data = info.chapters;
//   // console.log(data);

//   (async () => {

//     const csv = new ObjectsToCsv(data);
//     //const csv = new ObjectsToCsv(data);
//     await csv.toDisk('./subtitles/chapters.csv', { append: true });
   
//   })();
  
  
// })


