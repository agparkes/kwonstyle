'use strict';

const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

exports.list = function(url, cb) {
  //this is the actual request to the pinterest page I care about
  request(url, function(error, resp, body) {
      if (error) {
        cb({
          error: error
        });
      }
      if (!error) {
          const $ = cheerio.load(body);
          const $url = url;
          const $img = $('.post-image img').find('img').prop('src');
          const $desc = $('.post-image img').attr('alt');

        console.log($img + ' image url');

      //Finding the bits on the page we care about based on class names
      const image = {
//        img: $img,
        img: "http:" + $img,
        url: $url,
        desc: $desc
      }

      //respond with the final json
      console.log('scraped: ', image);
      cb(image);
    }
  });
}

//================
/*
var fs      = require('fs');
var request = require('request');
// Or with cookies
// var request = require('request').defaults({jar: true});

request.get({url: 'https://someurl/somefile.torrent', encoding: 'binary'}, function (err, response, body) {
  fs.writeFile("/tmp/test.torrent", body, 'binary', function(err) {
    if(err)
      console.log(err);
    else
      console.log("The file was saved!");
  }); 
});
*/
//==================