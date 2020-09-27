const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig')
const Course = require('../models/Course');
const User = require('../models/User');
const Word = require('../models/Word');

router.get('/',
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
    async (req, res) => {
        try {

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });


module.exports = router;