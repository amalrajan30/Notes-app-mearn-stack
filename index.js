const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

app.use('/signup', require('./routes/users'))
app.use('/notes', require('./routes/notes'))
app.use('/login', require('./routes/auth'))


mongoose.connect(process.env.MONGODB_CONNECT,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    })

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log("Server listening on port " + port);
});