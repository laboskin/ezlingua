const {Router} = require('express');
const jwt = require('jsonwebtoken');
const router = Router();
const bcrypt = require('bcrypt');
const config = require('config');
const jwtConfig = config.get('jwtConfig');
const {body, cookie} = require('express-validator');
const validationResultsCheckMiddleware = require('../middleware/validationResultsCheckMiddleware');
const {checkIfCourseExists} = require('../middleware/documentExistanceMiddleware');
const RefreshToken = require('../models/RefreshToken');
const User = require('../models/User');

router.post('/register', [
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('email').isString().trim().isEmail().normalizeEmail(),
        body('password').isString().isLength({min: 8, max: 50}).matches(/^([A-Za-z0-9.$\\/[\]\-_@])/),
        body('course').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
    try {
        const {email, password, name, language} = req.body;

        // Check if email is already in use
        if (await User.findOne({email}))
            return res.status(400).json({message: 'User with this email already exist'});

        // Create and save new user
        const user = new User({email, password: await bcrypt.hash(password, 10), name, course: language});
        user.save();

        // Generate access and refresh tokens
        const accessToken = createAccessToken(user);
        const refreshToken = await createRefreshToken(user);

        // Send response
        res.cookie('refreshToken', refreshToken, {
            maxAge: jwtConfig.refreshTokenAge,
            httpOnly: true
        })
            .status(200)
            .json({accessToken, refreshToken, accessTokenAge: jwtConfig.accessTokenAge});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/login', [
        body('email').isString().trim().isEmail().normalizeEmail(),
        body('password').isString().isLength({min: 8, max: 50}).matches(/^([A-Za-z0-9.$\\/[\]\-_@])/),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const {email, password} = req.body;

            // Check email/password
            const user = await User.findOne({email});
            if (!user)
                return res.status(400).json({message: 'Wrong email or password'});
            if (!(await bcrypt.compare(password, user.password)))
                return res.status(400).json({message: 'Wrong email or password'});

            // Generate access and refresh tokens
            const accessToken = createAccessToken(user);
            const refreshToken = await createRefreshToken(user);

            // Send response
            res.cookie('refreshToken', refreshToken, {
                maxAge: jwtConfig.refreshTokenAge,
                httpOnly: true
            })
                .status(200)
                .json({accessToken, refreshToken, accessTokenAge: jwtConfig.accessTokenAge});
        } catch (e) {
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/refresh', [
        cookie('refreshToken').isMongoId().optional(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            // Check if refresh token is valid
            const oldRefreshTokenDocument = await RefreshToken.findById(req.cookies['refreshToken']);
            if (!oldRefreshTokenDocument || new Date().getTime() - oldRefreshTokenDocument.issuedAt.getTime() > jwtConfig.refreshTokenAge) {
                if(oldRefreshTokenDocument)
                    oldRefreshTokenDocument.remove();
                return res.clearCookie('refreshToken').json({message: 'Refresh token is expired'});
            }

            // Generate access and refresh tokens
            const user = await User.findOne(oldRefreshTokenDocument.user);
            const accessToken = createAccessToken(user);
            const refreshToken = await createRefreshToken(user);

            setTimeout(() => oldRefreshTokenDocument.remove(), 5*1000);

            res.cookie('refreshToken', refreshToken, {
                maxAge: jwtConfig.refreshTokenAge,
                httpOnly: true
            })
                .status(200)
                .json({accessToken, refreshToken, accessTokenAge: jwtConfig.accessTokenAge});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/logout', [
        cookie('refreshToken').isMongoId().optional(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const refreshToken = req.cookies['refreshToken'];

            // Delete refresh token from DB if it exists
            if (refreshToken) {
                const refreshTokenModel = await RefreshToken.findById(refreshToken);
                refreshTokenModel.remove();
            }
            res.clearCookie('refreshToken')
                .status(200)
                .json({message: "Logout success"});
        } catch (e) {
            res.status(500).json({message: 'Server error'});
        }
    });


// Helpers
function createAccessToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin
        },
        jwtConfig.secret,
        {
            expiresIn: jwtConfig.accessTokenAge
        });
}
async function createRefreshToken(user) {
    const refreshToken = new RefreshToken({user: user.id, issuedAt: new Date() });
    await refreshToken.save();
    return refreshToken.id;
}


module.exports = router;