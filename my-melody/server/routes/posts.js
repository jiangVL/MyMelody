var express = require('express');
var mongoose = require('mongoose');
var Post = require('../models/post');
var Track = require('../models/track');

var router = express.Router();

router.route('/')
    // get all all posts 
    .get((req, res) => {
        Post.find({})
            .populate('track')
            .exec((err, posts) => {
                if (err) res.send(err);
                else res.jsonp(posts);
            });
    })
    // save new post 
    .post((req, res) => {
        var newTrack = new Track({ _id: new mongoose.Types.ObjectId()});
        Object.assign(newTrack, req.body.track);

        newTrack.save(err => {
            if (err) res.send(err);
            else {
                var newPost = new Post({
                    username: req.body.username,
                    track: newTrack._id,
                    caption: req.body.caption 
                });
                
                newPost.save((err2, post) => {
                    if (err2) res.send(err2);
                    else res.jsonp(post);
                });
            }
        })
   })

router.route('/:username')
    // get all posts made by username
    .get((req, res) => {
        Post.find({username: req.params.username})
            .populate('track')
            .exec((err, posts) => {
                if (err) res.send(err);
                else res.jsonp(posts);
            });
    })

/* TODO: update and delete posts
router.route('/:postid')
    .put((req, res) => {

    })
*/
module.exports = router;