var multiline = require('multiline');
var Topic        = require('../proxy').Topic;
var eventproxy   = require('eventproxy');

// static page
// About
exports.about = function (req, res, next) {
  res.render('static/about', {
    pageTitle: '关于我们'
  });
};

// FAQ
exports.faq = function (req, res, next) {
  res.render('static/faq');
};

exports.blacklist = function (req, res) {
  res.render('static/blacklist', {
    pageTitle: '黑名单'
  });
};


exports.robots = function (req, res, next) {
  res.type('text/plain');
  res.send(multiline(function () {;
/*
# See http://www.robotstxt.org/robotstxt.html for documentation on how to use the robots.txt file
#
# To ban all spiders from the entire site uncomment the next two lines:
# User-Agent: *
# Disallow: /
*/
  }));
};

exports.api = function (req, res, next) {
  res.render('static/api');
};

exports.wxindex = function(req, res, next){
  let number = Number(req.query.number || '30');

  let proxy = new eventproxy();
  proxy.fail(next);

  let query = {
      good: true,
  };
  let options = { limit: number, sort: '-top -create_at'};

  Topic.getTopicsByQuery(query, options, proxy.done('topics', function (topics) {
      return topics;
  }));

  proxy.all('topics',
      function (topics, ) {
          res.render('static/wxindex', {
              topics: topics,
          });
      });
};