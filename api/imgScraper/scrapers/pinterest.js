'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function (url, cd) {
    request(url, function (error, resp, body) {
        if (error) {
            cb({
                error: error
            });
        }
        if (!error) {
            var $ = cheerio.load(body);
            var pin = {};
            var $url = url;
            var img = $("meta[itemprop = 'image']").get(1);
            var $img = $(img).attr('content');
            var $desc = $("meta[itemprop = 'text']").attr('content');
            
            //            OLD CODE =========== OLD CODE
//            var $img = $('.post-image img').attr('src');
//            var $desc = $('.post-image img').attr('alt');
            //            var $img = $('.MIw.QLY.Rym.ojN.p6V.zI7.iyn.Hsu img').attr('src');//get from pinterest
            //            var $desc = $('.MIw.QLY.Rym.ojN.p6V.zI7.iyn.Hsu img').attr('alt');//description from pinterest
            //            OLD CODE =========== OLD CODE

            console.log($img + 'pin url');

            //Finding the bits on the page we care about based on class names
            var pin = {
                img: $img,
                url: $url,
                desc: $desc
            }
            //respond with the final JSON object
            cb(pin);
        }
    });
}


