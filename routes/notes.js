const express = require('express')
const router = express.Router()
const Agenda = require('agenda')
const mongoose = require('mongoose')
const dbConnection = mongoose.connection

Notes = require('../models/Notes')
const auth = require('../middleware/auth')

let agenda = new Agenda({ mongo: dbConnection })

async function callAgenda(id, time, title) {
  agenda.start()
  agenda.schedule(time, 'notes reminder', { usrId: id, title })
}

router.post("/", auth, (req, res) => {
  const { title, body, time } = req.body
  const socket = req.app.get('socketio')
  agenda.define('notes reminder', function (job, done) {
    console.log('Receied in agenda 20 sec -----', job.attrs.data.usrId);
    socket.emit('Testing socket', job.attrs.data.title)
    done();
  })
  var data = new Notes({ title: title, body: body, owner: req.userId })
  data.save()
    .then(item => {
      callAgenda(req.userId, time, title)
      Notes.find({ owner: req.userId }).select('-owner')
        .then(item => res.json(item))
    })
    .catch(err => {
      console.log('Post err -----', err)
      res.status(400).send(err)
    })
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