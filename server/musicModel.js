var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var musicSchema = new Schema({
title: { type: String, required: true, unique: true },
author: String,
lengthInSeconds: Number,
favorite: Boolean
});

var Music = mongoose.model('Music', musicSchema);

module.exports = Music;