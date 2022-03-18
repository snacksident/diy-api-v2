const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String
})

//make schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    name: String,
    comments: [commentSchema]
})
//make model and export
module.exports = mongoose.model('Blog',blogSchema)