require("dotenv").config();


var express = require('express');
var Twitter = require('twitter');

var router = express.Router(); 
var client = new Twitter({
    consumer_key: 'jqeybHapLXPhchKVfSrMf5K5q',
    consumer_secret: 'qhaF8DZQbL05gMWUHJsiQZf3ZhMnGnFxpdXK9uogVpRM0DcZv5',
    access_token_key: '978300358572244992-TiI84HyXZaf3T33rcmfVn8gsCSScmdn',
    access_token_secret: 'kwPcCJB8V9wbeTEnEJPfLTnntn9YVCRQ4yjX5sDlxaXw7'
});

router.get('/', function(req, res, next) {

    client.get('statuses/user_timeline', { screen_name: 'Jones2813308004', count: 20 }, function(error, tweets, response) {
    if (!error) {
      res.status(200).render('index', { title: 'Express', tweets: tweets });
    }
    else {
      res.status(500).json({ error: error });
    }
  });
});

module.exports = router;