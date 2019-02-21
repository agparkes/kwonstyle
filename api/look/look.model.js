'use strick';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LookSchema = new Schema({
    image: String,
    linkURL: String,
    title: String,
    description: String,
    tags: [{
        type: String.
  }],
    _creator: {
        type: Schema.Objectid,
        ref: 'User'
    },
    email: String,
    userName: String,
    createTime: {
        'default': Date.now
    },
    view: {
        type: Number,
        'default': 0
    },
    upVotes: {
        type: Number,
        'default': 0
    }
});

module.exports = mongoose.model('Look', LookSchema);

