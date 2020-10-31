const {Router} = require('express');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const router = Router();
const config = require('config');
const jwtConfig = config.get('jwtConfig')

router.post('/register', async (req, res) => {
    try {
        const {email, password, name, language} = req.body;

        if (await User.findOne({email}))
            return res.status(400).json({message: 'User with this email already exist'});

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({email, password: passwordHash, name, course: language});
        user.save();

        // Generate access token
        const accessToken = generateAccessToken(getAccessPayloadFromUserModel(user));

        // Generate and save refresh token
        const refreshToken = uuidv4();
        new RefreshToken({refreshToken, user: user.id, issuedAt: new Date()}).save();
        // Send response
        res.cookie('refreshToken', refreshToken, {
            maxAge: jwtConfig.refreshTokenAge,
            httpOnly: true
        })
            .status(200)
            .json({accessToken, refreshToken});
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
            return res.status(400).json({message: 'Wrong email or password'});
        if (!(await bcrypt.compare(password, user.password)))
            return res.status(400).json({message: 'Wrong email or password'});

        // Generate access token
        const accessToken = generateAccessToken(getAccessPayloadFromUserModel(user));

        // Generate and save refresh token
        const refreshToken = uuidv4();
        new RefreshToken({refreshToken, user: user.id, issuedAt: new Date()}).save();
        // Send response
        res.cookie('refreshToken', refreshToken, {
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
        const refreshToken = req.cookies['refreshToken'];

        // Check if refresh token is provided
        if (!refreshToken)
            return res.status(204).json({message: 'Refresh token was not provided'});

        // Check if refresh token is not expired
        const refreshTokenModel = await RefreshToken.findOne({refreshToken});
        if (!refreshTokenModel || new Date().getTime() - refreshTokenModel.issuedAt.getTime() > jwtConfig.refreshTokenAge) {
            refreshTokenModel && refreshTokenModel.remove();
            return res.status(204).clearCookie('refreshToken').json({message: 'Refresh token is expired'});
        }

        setTimeout(() => refreshTokenModel.remove(), 5*1000);

        const user = await User.findOne(refreshTokenModel.user);
        const newAccessToken = generateAccessToken(getAccessPayloadFromUserModel(user));
        const newRefreshToken = uuidv4();
        new RefreshToken({refreshToken: newRefreshToken, user: user.id, issuedAt: new Date() }).save();

        res.cookie('refreshToken', newRefreshToken, {
            maxAge: jwtConfig.refreshTokenAge,
            httpOnly: true
        })
            .status(200)
            .json({accessToken: newAccessToken, refreshToken: newRefreshToken});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/logout', async (req, res) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        const refreshTokenModel = await RefreshToken.findOne({refreshToken});
        refreshTokenModel.remove();
        res.clearCookie('refreshToken')
            .status(200)
            .json({message: "Logout success"});
    } catch (e) {
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

function getAccessPayloadFromUserModel(user) {
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
    }
}

module.exports = router;