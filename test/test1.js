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
//                 console.log('response ' + response);
//                 console.log('body ' + body);
//                 body = new Buffer(body, 'binary');
// //                 iconv2 = new Iconv('euc-kr', 'UTF8');
//                 iconv2 = new Iconv('utf8', 'UTF8');
//                 var utf8String = iconv2.convert(body).toString();
//                 //console.log(utf8String);
//                 var loaded = cheerio.load(utf8String);
                resolve(body);
            });
        });
    };
    
  
        function printStatus(loaded) {
        var list = loaded('tr >  td.st2');
        var up = 0,
            down = 0,
            same = 0;
        _.each(list, function (data) {
            var companyName = data.children[0].children[0].data;
            var companyCode = data.children[0].attribs.title;
            var currentValue = data.next.children[0].data;
            var offsetValue = data.next.next.children[0].children[0].data;
            //console.log(companyName);
            //console.log(offsetValue);
            if (offsetValue === undefined) {
                if (data.next.next.children[0].children[0].attribs.title == '상한') {
                    offsetValue = '▲' + data.next.next.children[0].children[1].data;

                }
                else if (data.next.next.children[0].children[0].attribs.title == '하한') {
                    offsetValue = '▼' + data.next.next.children[0].children[1].data;
                }
            }
            //offsetValue = offsetValue.toString();
            //if (!(offsetValue instanceof String)) {
            //    console.log('not a string : ' + offsetValue.constructor)
            //}
            //else {
            //    console.dir(typeof offsetValue);
            if (offsetValue.indexOf('▲') == 0) {
                up++;
            }
            else if (offsetValue.indexOf('▼') == 0) {
                down++;
            }
            else {
                same++;
            }
            //}
            //console.log(companyName + '(' + companyCode + ') : ' + currentValue + '(' + offsetValue + ')');
            //console.log(data);
        });
        var sum = up + down + same;
        console.log('count : ' + list.length + ', up : ' + up + ', down : ' + down + ', same : ' + same + ', sum : '
            + sum);
        return 0;
    }
    
            var requestOptions = {
        encoding: null,
        method: "GET",
        uri: 'http://ac.endic.naver.com/ac?q=%EA%B0%80&q_enc=utf-8&st=11001&r_format=json&r_enc=utf-8&r_lt=11001&r_unicode=0&r_escape=1',
        json: true
    };

    
    
     getUrlContents(requestOptions)
        .then(function (loaded) {
//             return parseCompanyList(loaded);
// 			var json = JSON.stringify(loaded);
//             console.log(loaded.items);
            _.each(loaded.items, function(data) {
            	console.log(data);
            });
        })
        .
        catch(function (err) {
            console.log(err);
        });