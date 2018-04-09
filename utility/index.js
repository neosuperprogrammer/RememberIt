var _ = require('underscore');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var Iconv = require('iconv').Iconv;
var Promise = require('bluebird');

function getUrlContents(requestOption) {
	return new Promise(function (resolve, reject) {
		request(requestOption, function (error, response, body) {
			if (error) {
				reject(error);
				return;
			}
			body = new Buffer(body, 'binary');
			iconv2 = new Iconv('euc-kr', 'UTF8');
			var utf8String = iconv2.convert(body).toString();
			//console.log(utf8String);
			var loaded = cheerio.load(utf8String);
			resolve(loaded);
		});
	});
};
    
var contents = {
  requestUrlContents: function (url, callback) {
  	var requestOptions = {
        encoding: null,
        method: "GET",
        uri: url
    };
   getUrlContents(requestOptions)
	.then(function (loaded) {
		callback(loaded, null);
	})
	.
	catch(function (err) {
		console.log(err);
		callback(null, err);
	});
  }
};

var exports = module.exports = contents;
