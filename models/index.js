const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/diy-blog-api')

const db = mongoose.connection

db.once('open',()=>{
    console.log(`mongodb up and running on ${db.host}:${db.port}`)
})

db.on('error',(err)=>{
    console.log(`something went terribly wrong ${err}`)
})

module.exports.Blog = require('./blog')