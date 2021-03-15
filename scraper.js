//Scrapper file I use to get data
var youtubeChapters = require('get-youtube-chapters');
var scrap = require('youtube-captions-scraper');
const fetch = require('node-fetch');

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

//Code will get subtitles for a video and return
//TODO: Save these along with the chapter locations to some data format we can get from python
// scrap.getSubtitles({
//     videoID: 'fqMOX6JJhGo', // youtube video id
//     lang: 'en' // default: `en`
//   }).then(captions => {
//     console.log(captions);
//   });

//VIdeo url -> consider getting a playlist of captioned videos to train on, automate this to generate tons of data
  let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=fqMOX6JJhGo&key=AIzaSyAZ01ou-EKzuuw1HceohS80LpLlR0tjmGA';
  
  var item = "";

  //Getting youtube API call, save the desciption for the video
  fetch(url)
  .then(res => res.json())
  .then((out) => {
    item = `

(0:00) Intro
(1:36) BOCA
(4:44) Break the wall
(8:29) Can't get you out of my mind
(12:09) Dear
(15:55) BOCA (Inst.)
`

  item = ` 
0:00 Introduction
2:35 Docker Overview
5:10 Getting Started
16:58 Install Docker
21:00 Commands
29:00 Labs
33:12 Run
42:19 Environment Variables
44:07 Images
51:38 CMD vs ENTRYPOINT
58:37 Networking
1:03:55 Storage
1:16:27 Compose
1:34:49 Registry
1:39:38 Engine
1:46:20 Docker on Windows
1:53:22 Docker on Mac
1:55:20 Container Orchestration
1:59:25 Docker Swarm
  
2:03:21 Kubernetes
2:09:30 Conclusion`
    // item = out.items[0].snippet.description;
    // item = item.replaceAll('(',"");
    // item = item.replaceAll(')',"");
    // item = item.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    
    console.log(item)
    var chapters = youtubeChapters(item)
    
    
    console.log('Checko ', chapters);
  })
  .catch(err => { throw err });

  



    //console.log(chapters)