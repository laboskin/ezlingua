const {Router} = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const router = Router();
const jwtConfig = config.get('jwtConfig')

router.post('/register', async (req, res) => {
    try {
        const {email, password} = req.body;

        if (await User.findOne({email}))
            return res.status(400).json({message: 'User with this email already exist'});

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({email, password: passwordHash});
        user.save();

        return res.status(201).json({message: 'User has been created'});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/login', async (req, res) => {
    try {
        // Check email/password
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user)
            return res.status(400).json({message: 'User not found'});
        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).json({message: 'Wrong email or password'});

        // Generate access token
        const accessToken = generateAccessToken({
            user: user.id
        })

        // Generate and save refresh token
        const refreshToken = uuidv4();
        new RefreshToken({refreshToken, userId: user.id, issuedAt: new Date()}).save();
        // Send response
        res.cookie('refresh-token', refreshToken, {
            maxAge: jwtConfig.refreshTokenAge,
            httpOnly: true
        })
            .status(200)
            .json({accessToken, refreshToken});
    } catch (e) {
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/refresh', async (req, res) => {
    try {
        const refreshToken = req.cookies['refresh-token'];

        // Check if refresh token is provided
        if (!refreshToken)
            return res.status(400).json({message: 'Refresh token was not provided'});

        // Check if refresh token is not expired
        const refreshTokenModel = await RefreshToken.findOne({refreshToken});
        if (!refreshTokenModel || new Date().getTime() - refreshTokenModel.issuedAt.getTime() > jwtConfig.refreshTokenAge) {
            refreshTokenModel && refreshTokenModel.remove();
            return res.status(401).json({message: 'Refresh token is expired'});
        }

        refreshTokenModel.remove();

        const user = await User.findOne(refreshTokenModel.userId);
        const newAccessToken = generateAccessToken({
            user: user.id
        });
        const newRefreshToken = uuidv4();
        new RefreshToken({refreshToken: newRefreshToken, userId: user.id, issuedAt: new Date() }).save();

        res.cookie('refresh-token', newRefreshToken, {
            maxAge: jwtConfig.refreshTokenAge,
            httpOnly: true
        })
            .status(200)
            .json({newAccessToken, newRefreshToken});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

function generateAccessToken(payload) {
    return jwt.sign(
        payload,
        jwtConfig.secret,
        {
            expiresIn: jwtConfig.accessTokenAge
        });
}

module.exports = router;