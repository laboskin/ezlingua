const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config')
const authRouter = require('./routes/auth.routes');
const app = express();

const PORT = config.get('port');
const MONGO_URI = config.get('mongoUri');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api/auth', authRouter);

async function start() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => console.log(`App started on port ${PORT}`));
    } catch(e) {
        console.log('Error:', e.message);
        process.exit(1);
    }
}
start();

// TODO node-cron for removing old refresh tokens from db