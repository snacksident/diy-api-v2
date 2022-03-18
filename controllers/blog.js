const express = require('express')
const router = express.Router()
const db = require('../models')
const blog = require('../models/blog')

//GET /blog - show all blogs
router.get('/',(req,res)=>{
    db.Blog.find({})
        .then(blogs => res.json(blogs))
        .catch(console.log)
})

//POST /blog - create a blogs
router.post('/',(req,res)=>{
    //create blog with req.body
    db.Blog.create(req.body)
        .then(newBlog => {
            //send the newly created blog back / redirect
            res.json(newBlog)
        })
        //handle an error
        .catch(console.log)
})

//GET /blog/:id - read a single blog at :id
router.get('/:id',(req,res)=>{
    db.Blog.findById(req.params.id)
        .then(foundBlog => {
            if(!foundBlog) return res.status(404).json({msg: 'blog not found'})
            res.json(foundBlog)
        })
        .catch(err=>{
            console.log(err)
            res.status(503).json({msg: `server fried`})
        })
})

//PUT /blog/:id - update a single blog at :id
router.put('/:id',(req,res)=>{
    db.Blog.findByIdAndUpdate(req.params.id, req.body, {new: true} )
        .then(updatedBlog => res.json(updatedBlog))
        .catch(err => {
            console.log(err)
            res.status(503).json({msg: `oopsie daisy`})
        })
})

//DELETE /blog/:id - delete a single blog at :id
router.delete('/:id',(req,res)=>{
    db.Blog.findByIdAndDelete(req.params.id)
        .then(()=> res.status(204).json({msg: `bye bye blog @ ${req.params.id}`}))
        .catch(err=>{
            console.log(err)
            res.status(503).json({msg: 'ruh roh shaggy'})
        })
})

//POST /blog/:id/comment
router.post('/:id/comment', async (req,res)=>{
    try {
        //find blog @ :id
        const foundBlog = await db.Blog.findById(req.params.id)
        //push comment to the blogs comment array
        foundBlog.comments.push(req.body)
        //save the blog
        await foundBlog.save()
        //send response
        res.json(foundBlog)
    } catch (error) {
        console.log(error)
        res.status(503).json({message: 'no bueno'})
    }
})

module.exports = router