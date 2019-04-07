const express = require('express')
const router = express.Router()

Notes = require('../models/Notes')
const auth = require('../middleware/auth')

router.post("/", auth, (req, res) => {
  const { title, body } = req.body
  var data = new Notes({ title: title, body: body, owner: req.userId })
  data.save()
    .then(item => {
      Notes.find({ owner: req.userId }).select('-owner')
        .then(item => res.json(item))
    })
    .catch(err => res.status(400).send(err))
});

router.get("/", auth, (req, res) => {
  Notes.find({ owner: req.userId }).select('-owner')
    .then(item => {
      res.json(item)
    })
    .catch(err => {
      if (err) res.send(err)
    })
})

router.put("/", auth, (req, res) => {
  const id = req.body._id
  Notes.update({ _id: id, owner: req.userId }, { $set: { title: req.body.title, body: req.body.body } })
    .exec()
    .then(() => {
      Notes.find({ owner: req.userId }).select('-owner')
        .then(item => {
          res.json(item)
        })
    })
    .catch(err => res.send(err))
})

router.delete("/", auth, (req, res) => {
  var id = req.body._id
  Notes.deleteOne({ _id: id, owner: req.userId })
    .then(item => {
      Notes.find({ owner: req.userId }).select('-owner').then(item => res.json(item))
    })
    .catch(err => console.log(err))
})

module.exports = router