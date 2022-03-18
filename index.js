const express = require('express')
require('./models')
const cors = require('cors')

//middleware
const app = express()
const PORT = 8080

//parse json req bodies
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.json({msg: 'welcome to the blog api'})
})

// controllers
app.use('/blog', require('./controllers/blog'))
app.use('/comment', require('./controllers/comment'))

app.listen(PORT,()=>{
    console.log(`now chillin on port ${PORT}`)
})