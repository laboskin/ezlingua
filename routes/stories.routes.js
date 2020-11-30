const {Router} = require('express');
const router = Router();
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const config = require('config');
const azureConfig = config.get('azure');
const {body, param} = require('express-validator');
const jwtValidationMiddleware = require('../middleware/jwtValidationMiddleware');
const validationResultsCheckMiddleware = require('../middleware/validationResultsCheckMiddleware');
const {checkIfCourseExists, checkIfStoryExists} = require('../middleware/documentExistanceMiddleware');
const Course = require('../models/Course');
const Story = require('../models/Story');
const User = require('../models/User');
const Word = require('../models/Word');

router.use(jwtValidationMiddleware());

router.get('/all',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const stories = await Story.find({course: user.course});

            const result = stories.map(story => ({
                id: story.id,
                name: story.name,
                image: story.imageLink,
                isUserStory: user.stories.find(c => c.toString() === story.id.toString()) || undefined
            }));

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/:id', [
        param('id').isMongoId().custom(checkIfStoryExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const story = await Story.findOne({course: user.course, _id: req.params.id});

            const result = {
                id: story.id,
                name: story.name,
                image: story.imageLink,
                course: story.course,
                sentences: story.sentences
            };

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/get-translations', [
        body('courseId').isMongoId().custom(checkIfCourseExists),
        body('text').isString().trim().isLength({min: 1, max: 50}),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const course = await Course.findById(req.body.courseId)
                .populate('goalLanguage', 'code')
                .populate('sourceLanguage', 'code');

            const langFrom = course.goalLanguage.code;
            const langTo = course.sourceLanguage.code;
            const text = req.body.text;

            let result = await getTranslations(langFrom, langTo, text);
            if (!result.length)
                result = [await getTranslation(langFrom, langTo, text)];

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/complete/:id', [
        param('id').isMongoId().custom(checkIfStoryExists),
        body('*.original').isString().trim().isLength({min: 1, max: 50}),
        body('*.translation').isString().trim().isLength({min: 1, max: 50}),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const story = await Story.findById(req.params.id);
            const words = await Word.find({course: story.course});

            const addedWords = req.body;
            for (const addedWord of addedWords) {
                let candidate = words.find(word => word.original === addedWord.original && word.translation === addedWord.translation);
                if (!candidate)
                    candidate = await (new Word({
                        original: addedWord.original,
                        translation: addedWord.translation,
                        course: story.course
                    })).save();
                user.words.push({
                    model: candidate.id
                });
            }
            if (!user.stories.find(userStory => userStory.toString() === story.id.toString()))
                user.stories.push(story.id);

            await user.save();

            res.json({message: 'Story was successfully completed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

async function getTranslations(langFrom, langTo, text) {
    try {
        const response = await axios.post(`${azureConfig.endpoint}/dictionary/lookup?api-version=3.0&from=${langFrom}&to=${langTo}`, [{Text: text}], {
            headers: {
                'Content-type': 'application/json',
                'Ocp-Apim-Subscription-Key': azureConfig.key,
                'X-ClientTraceId': uuidv4()
            }
        });
        if (!response)
            throw new Error();
        return response.data[0].translations.map(translation => ({
            text: translation.normalizedTarget,
            confidence: translation.confidence
        })).sort((a, b) => b.confidence - a.confidence).filter((translation, idx) => idx < 5);
    } catch(e) {
        return [];
    }
}
async function getTranslation(langFrom, langTo, text) {
    const response = await axios.post(`${azureConfig.endpoint}/translate?api-version=3.0&from=${langFrom}&to=${langTo}`, [{Text: text}], {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': azureConfig.key,
            'X-ClientTraceId': uuidv4()
        }
    });
    if (!response)
        throw new Error();
    return {
        text: response.data[0].translations[0].text,
        confidence: 1
    };
}

module.exports = router;