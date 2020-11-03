const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig');
const azureConfig = config.get('azure');
const User = require('../models/User');
const Story = require('../models/Story');
const Course = require('../models/Course');
const Word = require('../models/Word');
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

router.use(jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }))

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

router.get('/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const story = await Story.findOne({course: user.course, _id: req.params.id});
            if (!story)
                return res.status(404).json({message: 'Story not found'});

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

router.post('/get-translations',
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

router.post('/complete/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const story = await Story.findOne({course: user.course, _id: req.params.id});
            if (!story)
                return res.status(404).json({message: 'Story not found'});

            const words = await Story.find({course: story.course});
            const addedWords = req.body;
            for (const addedWord of addedWords) {
                const candidate = words.find(word => word.original === addedWord.original && word.translation === addedWord.translation);
                let wordId;
                if (candidate)
                    wordId = candidate.id
                else {
                    const newWord = new Word({
                        original: addedWord.original,
                        translation: addedWord.translation,
                        course: story.course
                    });
                    await newWord.save();
                    wordId = newWord.id;
                }
                user.words.push({
                    model: wordId
                });
            }

            user.stories.push(story.id);
            await user.save();

            res.json({message: 'Story was successfully completed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

async function getTranslations(langFrom, langTo, text) {
    const response = await axios.post(`${azureConfig.endpoint}/dictionary/lookup?api-version=3.0&from=${langFrom}&to=${langTo}`, [{Text: text}], {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': azureConfig.key,
            'X-ClientTraceId': uuidv4()
        }
    });
    return response.data[0].translations.map(translation => ({
        text: translation.normalizedTarget,
        confidence: translation.confidence
    }))
        .sort((a, b) => b.confidence - a.confidence).filter((translation, idx) => idx < 5);
}

async function getTranslation(langFrom, langTo, text) {
    const response = await axios.post(`${azureConfig.endpoint}/translate?api-version=3.0&from=${langFrom}&to=${langTo}`, [{Text: text}], {
        headers: {
            'Content-type': 'application/json',
            'Ocp-Apim-Subscription-Key': azureConfig.key,
            'X-ClientTraceId': uuidv4()
        }
    });
    return {
        text: response.data[0].translations[0].text,
        confidence: 1
    };
}


module.exports = router;