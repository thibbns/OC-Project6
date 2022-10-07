const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true},
    dislikes: {type: Number, required: true},
    UserLiked: {type: String, required: true},
    userDisliked: {type: String, required: true}
});

module.exports = mongoose.model('Thing', thingSchema);