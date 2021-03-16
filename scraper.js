//Scrapper file I use to get data
var youtubeChapters = require('get-youtube-chapters');
var scrap = require('youtube-captions-scraper');
var jsa = require('./a.json');
const youtubedl = require('youtube-dl')
const fetch = require('node-fetch');
const ObjectsToCsv = require('objects-to-csv');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};


//console.log(jsa.chapters)
//Code will get subtitles for a video and return
// TODO: Save these along with the chapter locations to some data format we can get from python
scrap.getSubtitles({
    videoID: 'fqMOX6JJhGo', // youtube video id
    lang: 'en' // default: `en`
  }).then(captions => {
    console.log(captions);

    (async () => {

      const csv = new ObjectsToCsv(captions);
      //const csv = new ObjectsToCsv(data);
      await csv.toDisk('./subs.csv', { append: true });
     
    })();
  });

//Will track the url
const url = 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
// Optional arguments passed to youtube-dl.
const options = ['--write-info-json']


youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err

  var data = info.chapters;
  // console.log(data);

  (async () => {

    const csv = new ObjectsToCsv(data);
    //const csv = new ObjectsToCsv(data);
    await csv.toDisk('./test.csv', { append: true });
   
  })();
  
  
})


