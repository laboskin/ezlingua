const {Router} = require('express');
const router = Router();
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const responseRange = require('express-response-range');
const bcrypt = require("bcrypt");
const {body, param} = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtConfig = config.get('jwtConfig');
const azureConfig = config.get('azure');
const validationResultsCheckMiddleware = require('../middleware/validationResultsCheckMiddleware');
const jwtValidationMiddleware = require('../middleware/jwtValidationMiddleware');
const Course = require('../models/Course');
const Language = require('../models/Language');
const RefreshToken = require('../models/RefreshToken');
const Story = require('../models/Story');
const User = require('../models/User');
const Vocabulary = require('../models/Vocabulary');
const VocabularyGroup = require('../models/VocabularyGroup');
const Word = require('../models/Word');
const {
    checkIfCourseExists,
    checkIfLanguageExists,
    checkIfUserExists,
    checkIfVocabularyGroupExists
} = require('../middleware/documentExistanceMiddleware');

// Middleware
router.use(responseRange({
    alwaysSendRange: true
}));
router.use(jwtValidationMiddleware(true, ['/api/admin/login']));

// Login
router.post('/login', [
        body('email').isString().trim().isEmail().normalizeEmail(),
        body('password').isString().notEmpty(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!(user && (await bcrypt.compare(password, user.password)) && user.isAdmin))
                return res.status(400).json({message: 'Wrong email or password'});

            const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin
                },
                jwtConfig.adminSecret,
                {expiresIn: jwtConfig.accessTokenAge});

            res.json({accessToken, accessTokenAge: jwtConfig.accessTokenAge});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Courses
router.get('/courses',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await Course.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit))
                .map(mapCourseToResponse);
            const count = await Course.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/courses/:id', [
    param('id').isMongoId(),
    validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            res.json(mapCourseToResponse(course));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/courses', [
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('goalLanguage').isMongoId().custom(checkIfLanguageExists),
        body('sourceLanguage').isMongoId().custom(checkIfLanguageExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const course = new Course({
                name: req.body.name,
                goalLanguage: req.body.goalLanguage,
                sourceLanguage: req.body.sourceLanguage
            });
            await course.save();

            res.json(mapCourseToResponse(course));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/courses/:id', [
        param('id').isMongoId(),
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('goalLanguage').isMongoId().custom(checkIfLanguageExists),
        body('sourceLanguage').isMongoId().custom(checkIfLanguageExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            course.name = req.body.name;
            course.goalLanguage = req.body.goalLanguage;
            course.sourceLanguage = req.body.sourceLanguage;

            await course.save();

            res.json(mapCourseToResponse(course));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/courses/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            if (!course)
                return res.status(404).json({message: 'Course not found'});
            await course.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Languages
router.get('/languages',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await Language.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit))
                .map(mapLanguageToResponse);
            const count = await Language.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/languages/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const language = await Language.findById(req.params.id);
            res.json(mapLanguageToResponse(language));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/languages', [
        body('name').isString().trim().isLength({min: 2, max: 20}),
        body('code').trim().isISO31661Alpha2(),
        body('image').exists(),
        body('image.src').isBase64(),
        body('image.ext').isString().trim().notEmpty(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const language = new Language({
                name: req.body.name,
                code: req.body.code,
                image: req.body.image
            });
            await language.save();

            res.json(mapLanguageToResponse(language));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/languages/:id', [
        param('id').isMongoId(),
        body('name').isString().trim().isLength({min: 2, max: 20}),
        body('code').trim().isISO31661Alpha2(),
        body('image').optional(),
        body('image.src').if(body('image').exists()).isBase64(),
        body('image.ext').if(body('image').exists()).isString().trim().notEmpty(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const language = await Language.findById(req.params.id);
            language.code = req.body.code;
            language.name = req.body.name;
            language.image = req.body.image;

            await language.save();

            res.json(mapLanguageToResponse(language));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/languages/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const language = await Language.findById(req.params.id);
            if (!language)
                return res.status(404).json({message: 'Language not found'});
            await language.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// RefreshTokens
router.get('/refresh-tokens',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await RefreshToken.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit))
                .map(mapRefreshTokenToResponse);
            const count = await RefreshToken.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/refresh-tokens/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const refreshToken = await RefreshToken.findById(req.params.id);
            res.json(mapRefreshTokenToResponse(refreshToken));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/refresh-tokens', [
        body('user').isMongoId().custom(checkIfUserExists),
        body('issuedAt').isRFC3339().isBefore(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const refreshToken = new RefreshToken({
                user: req.body.user,
                issuedAt: req.body.issuedAt
            });
            await refreshToken.save();

            res.json(mapRefreshTokenToResponse(refreshToken));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/refresh-tokens/:id', [
        param('id').isMongoId(),
        body('user').isMongoId().custom(checkIfUserExists),
        body('issuedAt').isRFC3339().isBefore(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const refreshToken = await RefreshToken.findById(req.params.id);
            refreshToken.user = req.body.user;
            refreshToken.issuedAt = req.body.issuedAt;

            await refreshToken.save();

            res.json(mapRefreshTokenToResponse(refreshToken));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/refresh-tokens/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const refreshToken = await RefreshToken.findById(req.params.id);
            if (!refreshToken)
                return res.status(404).json({message: 'RefreshToken not found'});
            await refreshToken.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Stories
router.get('/stories',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await Story.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit))
                .map(mapStoryToResponse);
            const count = await Story.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/stories/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const story = await Story.findById(req.params.id);
            res.json(mapStoryToResponse(story));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/stories', [
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('image').optional(),
        body('image.src').if(body('image').exists()).isBase64(),
        body('image.ext').if(body('image').exists()).isString().notEmpty(),
        body('course').isMongoId().custom(checkIfCourseExists),
        body('text').isString().trim().notEmpty(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
    try {
        const story = new Story({
            name: req.body.name,
            image: req.body.image,
            course: req.body.course,
            sentences: await splitTextIntoSentences(req.body.text)
        });

        await story.save();

        res.json(mapStoryToResponse(story));
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});
router.put('/stories/:id', [
        param('id').isMongoId(),
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('image').optional(),
        body('image.src').if(body('image').exists()).isBase64(),
        body('image.ext').if(body('image').exists()).isString().notEmpty(),
        body('course').isMongoId().custom(checkIfCourseExists),
        body('text').isString().trim().notEmpty(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const story = await Story.findById(req.params.id);
            story.name = req.body.name;
            story.course = req.body.course;
            story.image = req.body.image;
            story.sentences = await splitTextIntoSentences(req.body.text);

            await story.save();

            res.json(mapStoryToResponse(story));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/stories/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const story = await Story.findById(req.params.id);
            if (!story)
                return res.status(404).json({message: 'Story not found'});
            await story.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Users
router.get('/users',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await User.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit)
                .populate('words.vocabulary', 'name')
                .populate({
                    path: 'words.model',
                    select: 'original translation',
                    populate: {
                        path: 'course',
                        select: 'name'
                    }
                }))
                .map(mapUserToResponse);
            const count = await User.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/users/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
                .populate('words.vocabulary', 'name')
                .populate({
                    path: 'words.model',
                    select: 'original translation',
                    populate: {
                        path: 'course',
                        select: 'name'
                    }
                });
            res.json(mapUserToResponse(user));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/users', [
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('email').isString().trim().isEmail().normalizeEmail(),
        body('password').isString().isLength({min: 8, max: 50}).matches(/^([A-Za-z0-9.$\\/[\]\-_@])/),
        body('course').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: await bcrypt.hash(req.body.password, 10),
                course: req.body.course
            });

            await user.save();

            await user.populate('words.vocabulary', 'name')
                .populate({
                    path: 'words.model',
                    select: 'original translation',
                    populate: {
                        path: 'course',
                        select: 'name'
                    }
                })
                .execPopulate();

            res.json(mapUserToResponse(user));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/users/:id', [
        param('id').isMongoId(),
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('email').isString().trim().isEmail().normalizeEmail(),
        body('password').isString().isLength({min: 8, max: 50}).matches(/^([A-Za-z0-9.$\\/[\]\-_@])/).optional(),
        body('course').isMongoId().custom(checkIfCourseExists),
        body('stories').isArray().optional(),
        body('stories.*').if(body('stories').exists()).isMongoId(),
        body('words').isArray().optional(),
        body('words.*.id').if(body('words').exists()).isMongoId(),
        body('words.*.trainingCards').if(body('words').exists()).isBoolean(),
        body('words.*.trainingConstructor').if(body('words').exists()).isBoolean(),
        body('words.*.trainingListening').if(body('words').exists()).isBoolean(),
        body('words.*.trainingTranslationWord').if(body('words').exists()).isBoolean(),
        body('words.*.trainingWordTranslation').if(body('words').exists()).isBoolean(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            user.name = req.body.name;
            user.email = req.body.email;
            user.course = req.body.course;
            if (req.body.password)
                user.password = await bcrypt.hash(req.body.password, 10);
            user.stories = req.body.stories;

            user.words = req.body.words
                .filter(word => user.words.find(userWord => userWord.id.toString() === word.id))
                .map(word => {
                    const oldWord = user.words.find(userWord => userWord.id.toString() === word.id);
                    return {
                        id: word.id,
                        model: oldWord.model,
                        vocabulary: oldWord.vocabulary,
                        trainingCards: word.trainingCards,
                        trainingConstructor: word.trainingConstructor,
                        trainingListening: word.trainingListening,
                        trainingTranslationWord: word.trainingTranslationWord,
                        trainingWordTranslation: word.trainingWordTranslation,
                    }
                });

            await user.save();

            await user.populate('words.vocabulary', 'name')
                .populate({
                    path: 'words.model',
                    select: 'original translation',
                    populate: {
                        path: 'course',
                        select: 'name'
                    }
                })
                .execPopulate();
            res.json(mapUserToResponse(user));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/users/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user)
                return res.status(404).json({message: 'User not found'});
            await user.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Vocabularies
router.get('/vocabularies',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await Vocabulary.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit).populate('words', 'original translation'))
                .map(mapVocabularyToResponse);
            const count = await Vocabulary.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/vocabularies/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findById(req.params.id).populate('words', 'original translation');

            res.json(mapVocabularyToResponse(vocabulary));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/vocabularies', [
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('image').optional(),
        body('image.src').if(body('image').exists()).isBase64(),
        body('image.ext').if(body('image').exists()).isString().notEmpty(),
        body('course').isMongoId().custom(checkIfCourseExists),
        body('words').isArray().optional(),
        body('words.*.original').if(body('words').exists()).isString().trim().notEmpty(),
        body('words.*.translation').if(body('words').exists()).isString().trim().notEmpty(),
        body('vocabularyGroup').isMongoId().custom(checkIfVocabularyGroupExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabulary = new Vocabulary({
                name: req.body.name,
                course: req.body.course,
                vocabularyGroup: req.body.vocabularyGroup,
                image: req.body.image,
                words: req.body.words && await getWordsIdsFromWordsObjectArray(req.body.words, req.body.course)
            });

            await vocabulary.save();

            await vocabulary.populate('words', 'original translation').execPopulate();
            res.json(mapVocabularyToResponse(vocabulary));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/vocabularies/:id', [
        param('id').isMongoId(),
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('image').optional(),
        body('image.src').if(body('image').exists()).isBase64(),
        body('image.ext').if(body('image').exists()).isString().notEmpty(),
        body('course').isMongoId().custom(checkIfCourseExists),
        body('words').isArray().optional(),
        body('words.*.original').if(body('words').exists()).isString().trim().notEmpty(),
        body('words.*.translation').if(body('words').exists()).isString().trim().notEmpty(),
        body('vocabularyGroup').isMongoId().custom(checkIfVocabularyGroupExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findById(req.params.id);
            vocabulary.name = req.body.name;
            vocabulary.course = req.body.course;
            vocabulary.vocabularyGroup = req.body.vocabularyGroup;
            vocabulary.image = req.body.image;
            vocabulary.words = await getWordsIdsFromWordsObjectArray(req.body.words, req.body.course);

            await vocabulary.save();

            await vocabulary.populate('words', 'original translation').execPopulate();
            res.json(mapVocabularyToResponse(vocabulary));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/vocabularies/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findById(req.params.id);
            if (!vocabulary)
                return res.status(404).json({message: 'Vocabulary not found'});
            await vocabulary.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// VocabularyGroups
router.get('/vocabulary-groups',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await VocabularyGroup.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit))
                .map(mapVocabularyGroupToResponse);
            const count = await VocabularyGroup.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/vocabulary-groups/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabularyGroup = await VocabularyGroup.findById(req.params.id);
            res.json(mapVocabularyGroupToResponse(vocabularyGroup));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/vocabulary-groups', [
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('course').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabularyGroup = new VocabularyGroup({
                name: req.body.name,
                course: req.body.course
            });
            await vocabularyGroup.save();

            res.json(mapVocabularyGroupToResponse(vocabularyGroup));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/vocabulary-groups/:id', [
        param('id').isMongoId(),
        body('name').isString().trim().isLength({min: 2, max: 50}),
        body('course').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabularyGroup = await VocabularyGroup.findById(req.params.id);
            vocabularyGroup.name = req.body.name;
            vocabularyGroup.course = req.body.course;

            await vocabularyGroup.save();

            res.json(mapVocabularyGroupToResponse(vocabularyGroup));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/vocabulary-groups/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const vocabularyGroup = await VocabularyGroup.findById(req.params.id);
            if (!vocabularyGroup)
                return res.status(404).json({message: 'VocabularyGroup not found'});
            await vocabularyGroup.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Words
router.get('/words',
    async (req, res) => {
        try {
            const {filter, sort} = getSortAndFilterFromRequest(req);
            const result = (await Word.find(filter).sort(sort).skip(req.range.offset).limit(req.range.limit))
                .map(mapWordToResponse);
            const count = await Word.countDocuments(filter);
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/words/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const word = await Word.findById(req.params.id);
            res.json(mapWordToResponse(word));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/words', [
        body('original').isString().trim().isLength({min: 1, max: 50}),
        body('translation').isString().trim().isLength({min: 1, max: 50}),
        body('course').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            if (await Word.findOne({original: req.body.original, translation: req.body.translation, course: req.body.course}))
                return res.status(400).json({message: 'Word has already exist'});
            const word = new Word({
                original: req.body.original,
                translation: req.body.translation,
                course: req.body.course
            });
            await word.save();

            res.json(mapWordToResponse(word));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/words/:id', [
        param('id').isMongoId(),
        body('original').isString().trim().isLength({min: 1, max: 50}),
        body('translation').isString().trim().isLength({min: 1, max: 50}),
        body('course').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const candidate = await Word.findOne({original: req.body.original, translation: req.body.translation, course: req.body.course});
            if (candidate && candidate.id.toString() === req.params.id)
                return res.status(400).json({message: 'Word has already exist'});

            const word = await Word.findById(req.params.id);
            word.original = req.body.original;
            word.translation = req.body.translation;
            word.course = req.body.course;

            await word.save();

            res.json(mapWordToResponse(word));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/words/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const word = await Word.findById(req.params.id);
            if (!word)
                return res.status(404).json({message: 'Word not found'});
            await word.remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Mapping Mongoose document to REST API response object
const mapCourseToResponse = course => ({
    id: course._id,
    name: course.name,
    goalLanguage: course.goalLanguage,
    sourceLanguage: course.sourceLanguage
});
const mapLanguageToResponse = language => ({
    id: language._id,
    name: language.name,
    code: language.code,
    image: language.image && language.imageLink,
});
const mapRefreshTokenToResponse = refreshToken => ({
    id: refreshToken._id,
    user: refreshToken.user,
    issuedAt: refreshToken.issuedAt
});
const mapStoryToResponse = story => ({
    id: story._id,
    name: story.name,
    image: story.image && story.imageLink,
    course: story.course,
    text: getTextFromStorySentences(story.sentences)
});
const mapUserToResponse = user => ({
    id: user._id,
    email: user.email,
    name: user.name,
    course: user.course,
    isAdmin: user.isAdmin,
    words: user.words && user.words.map(word => ({
        id: word.id,
        original: word.model.original,
        translation: word.model.translation,
        vocabulary: word.vocabulary && word.vocabulary.name,
        course: word.model.course.name,
        trainingCards: word.trainingCards,
        trainingConstructor: word.trainingConstructor,
        trainingListening: word.trainingListening,
        trainingTranslationWord: word.trainingTranslationWord,
        trainingWordTranslation: word.trainingWordTranslation,
    })),
    stories: user.stories
});
const mapVocabularyToResponse = vocabulary => ({
    id: vocabulary._id,
    name: vocabulary.name,
    course: vocabulary.course,
    vocabularyGroup: vocabulary.vocabularyGroup,
    image: vocabulary.image && vocabulary.imageLink,
    words: vocabulary.words.map(word => ({
        original: word.original,
        translation: word.translation
    }))
});
const mapVocabularyGroupToResponse = vocabularyGroup => ({
    id: vocabularyGroup._id,
    name: vocabularyGroup.name,
    course: vocabularyGroup.course
});
const mapWordToResponse = word => ({
    id: word._id,
    original: word.original,
    translation: word.translation,
    course: word.course
});

// Helpers
const getWordsIdsFromWordsObjectArray = async (wordsArray, course) => {
    const result = [];
    for (const {original, translation} of wordsArray) {
        let candidate = await Word.findOne({ original, translation, course });
        if (!candidate)
            candidate = await (new Word({ original, translation, course })).save();
        if (!result.includes(candidate.id.toString()))
            result.push(candidate.id.toString());
    }
    return result;
}
const getTextFromStorySentences = sentences => sentences.reduce((text, sentence) => {
    if (sentence.isEmpty)
        return text + '\n';
    return text + sentence.parts.reduce((sentenceText, part) => sentenceText + part.text + (part.spaceAfter?' ':''), '')
}, '');
const splitTextIntoSentences = async text => {
    const paragraphs = text.split('\n').filter(paragraph => paragraph.trim().length !== 0);
    const data = paragraphs.map(paragraph => ({Text: paragraph}));

    const response = await axios.post(`${azureConfig.endpoint}/breaksentence?api-version=3.0`, data, {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': azureConfig.key,
            'X-ClientTraceId': uuidv4()
        }
    });

    const sentences = [];
    paragraphs.forEach((paragraph, paragraphId, paragraphArray) => {
        let currentCharPosition = 0;
        const sentenceLengths = response.data[paragraphId]['sentLen'];
        sentenceLengths.forEach(sentLen => {
            const parts = [];
            paragraph.slice(currentCharPosition, currentCharPosition + sentLen)
                .trim()
                .split(' ')
                .forEach(part => {
                    if (part.trim().length === 0)
                        return;

                    let prefix = '';
                    part.split('').every((symbol, idx) => {
                        if (symbol.toLowerCase() !== symbol.toUpperCase()) {
                            if (idx > 0)
                                prefix = part.slice(0, idx)
                            return false;
                        }
                        return true;
                    });

                    let suffix = '';
                    part.split('').reverse().every((symbol, idx) => {
                        if (symbol.toLowerCase() !== symbol.toUpperCase()) {
                            if (idx > 0)
                                suffix = part.slice(part.length - idx);
                            return false;
                        }
                        return true;
                    });

                    if (prefix) {
                        parts.push({
                            position: parts.length,
                            hasTranslation: false,
                            spaceAfter: false,
                            text: prefix
                        });
                    }

                    if (prefix.length + suffix.length < part.length) {
                        parts.push({
                            position: parts.length,
                            hasTranslation: true,
                            spaceAfter: !suffix,
                            text: part.slice(prefix.length, part.length - suffix.length)
                        });
                    }
                    if (suffix) {
                        parts.push({
                            position: parts.length,
                            hasTranslation: false,
                            spaceAfter: true,
                            text: suffix
                        });
                    }
                })
            sentences.push({
                position: sentences.length,
                parts
            });
            currentCharPosition += sentLen;
        });
        if (paragraphId !== paragraphArray.length - 1) {
            sentences.push({
                position: sentences.length,
                isEmpty: true
            });
        }
    });

    return sentences;
}
const getSortAndFilterFromRequest = req => {
    const filter = JSON.parse(req.query.filter);
    if(filter.id) {
        filter._id = filter.id;
        delete filter.id;
    }
    const sort = req.query.sort?{[JSON.parse(req.query.sort)[0]]: JSON.parse(req.query.sort)[1]}:{};
    return {filter, sort}
}

module.exports = router;