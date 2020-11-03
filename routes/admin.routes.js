const {Router} = require('express');
const router = Router();
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const responseRange = require('express-response-range');
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig');
const azureConfig = config.get('azure');
const Course = require('../models/Course');
const Language = require('../models/Language');
const RefreshToken = require('../models/RefreshToken');
const Story = require('../models/Story');
const User = require('../models/User');
const Vocabulary = require('../models/Vocabulary');
const VocabularyGroup = require('../models/VocabularyGroup');
const Word = require('../models/Word');
const bcrypt = require("bcrypt");

//router.use(jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }));
router.use(responseRange({
    alwaysSendRange: true
}));

// Courses
router.get('/courses',
    async (req, res) => {
        try {
            const result = (await Course.find().skip(req.range.offset).limit(req.range.limit))
                .map(mapCourseToResponse);
            const count = await Course.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/courses/:id',
    async (req, res) => {
        try {
            const course = await Course.findById(req.params.id);
            res.json(mapCourseToResponse(course));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/courses',
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
router.put('/courses/:id',
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
router.delete('/courses/:id',
    async (req, res) => {
        try {
            await (await Course.findById(req.params.id)).remove();
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
            const result = (await Language.find().skip(req.range.offset).limit(req.range.limit))
                .map(mapLanguageToResponse);
            const count = await Language.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/languages/:id',
    async (req, res) => {
        try {
            const language = await Language.findById(req.params.id);
            res.json(mapLanguageToResponse(language));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/languages',
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
router.put('/languages/:id',
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
router.delete('/languages/:id',
    async (req, res) => {
        try {
            await (await Language.findById(req.params.id)).remove();
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
            const result = (await RefreshToken.find().skip(req.range.offset).limit(req.range.limit))
                .map(mapRefreshTokenToResponse);
            const count = await RefreshToken.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/refresh-tokens/:id',
    async (req, res) => {
        try {
            const refreshToken = await RefreshToken.findById(req.params.id);
            res.json(mapRefreshTokenToResponse(refreshToken));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/refresh-tokens',
    async (req, res) => {
        try {
            const refreshToken = new RefreshToken({
                refreshToken: req.body.refreshToken,
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
router.put('/refresh-tokens/:id',
    async (req, res) => {
        try {
            const refreshToken = await RefreshToken.findById(req.params.id);
            refreshToken.refreshToken = req.body.refreshToken;
            refreshToken.user = req.body.user;
            refreshToken.issuedAt = req.body.issuedAt;

            await refreshToken.save();

            res.json(mapRefreshTokenToResponse(refreshToken));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/refresh-tokens/:id',
    async (req, res) => {
        try {
            await (await RefreshToken.findById(req.params.id)).remove();
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
            const result = (await Story.find().skip(req.range.offset).limit(req.range.limit))
                .map(mapStoryToResponse);
            const count = await Story.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/stories/:id',
    async (req, res) => {
        try {
            const story = await Story.findById(req.params.id);
            res.json(mapStoryToResponse(story));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/stories',
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
router.put('/stories/:id',
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
router.delete('/stories/:id',
    async (req, res) => {
        try {
            await (await Story.findById(req.params.id)).remove();
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
            const result = (await User.find().skip(req.range.offset).limit(req.range.limit)
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
            const count = await User.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/users/:id',
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
router.post('/users',
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
router.put('/users/:id',
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
router.delete('/users/:id',
    async (req, res) => {
        try {
            await (await User.findById(req.params.id)).remove();
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
            const result = (await Vocabulary.find().skip(req.range.offset).limit(req.range.limit).populate('words', 'original translation'))
                .map(mapVocabularyToResponse);
            const count = await Vocabulary.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/vocabularies/:id',
    async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findById(req.params.id).populate('words', 'original translation');

            res.json(mapVocabularyToResponse(vocabulary));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/vocabularies',
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
router.put('/vocabularies/:id',
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
router.delete('/vocabularies/:id',
    async (req, res) => {
        try {
            await (await Vocabulary.findById(req.params.id)).remove();

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
            const result = (await VocabularyGroup.find().skip(req.range.offset).limit(req.range.limit))
                .map(mapVocabularyGroupToResponse);
            const count = await VocabularyGroup.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/vocabulary-groups/:id',
    async (req, res) => {
        try {
            const vocabularyGroup = await VocabularyGroup.findById(req.params.id);
            res.json(mapVocabularyGroupToResponse(vocabularyGroup));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/vocabulary-groups',
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
router.put('/vocabulary-groups/:id',
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
router.delete('/vocabulary-groups/:id',
    async (req, res) => {
        try {
            await (await VocabularyGroup.findById(req.params.id)).remove();
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
            const result = (await Word.find().skip(req.range.offset).limit(req.range.limit))
                .map(mapWordToResponse);
            const count = await Word.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/words/:id',
    async (req, res) => {
        try {
            const word = await Word.findById(req.params.id);
            res.json(mapWordToResponse(word));
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/words',
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
router.put('/words/:id',
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
router.delete('/words/:id',
    async (req, res) => {
        try {
            await (await Word.findById(req.params.id)).remove();
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });




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
    refreshToken: refreshToken.refreshToken,
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

module.exports = router;