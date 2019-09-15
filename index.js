const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const app = express();
const http = require('http');
const socketIo = require('socket.io')
const port = process.env.PORT || 5000
const server = http.createServer(app)
const io = socketIo(server)
app.use(cors())
app.use(express.json());

app.use('/signup', require('./routes/users'))
app.use('/notes', require('./routes/notes'))
app.use('/login', require('./routes/auth'))

io.on('connection', socket => {
    console.log('User conneted')

    app.set('socketio', socket);

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

mongoose.connect(process.env.MONGODB_CONNECT,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(connection => console.log('Mongo Conneted'))
    .catch(err => console.log('Mongo connetion error'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

server.listen(port, () => {
    console.log("Server listening on port " + port);
});