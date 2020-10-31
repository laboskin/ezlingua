const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');
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

//router.use(jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }));
router.use(responseRange({
    alwaysSendRange: true
}));

// Courses
router.get('/courses',
    async (req, res) => {
        try {
            const result = (await Course.find().skip(req.range.offset).limit(req.range.limit))
                .map(course => ({
                    id: course._id,
                    name: course.name,
                    goalLanguage: course.goalLanguage,
                    sourceLanguage: course.sourceLanguage
                }));
            const count = await Language.countDocuments();
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
            const result = {
                id: course._id,
                name: course.name,
                goalLanguage: course.goalLanguage,
                sourceLanguage: course.sourceLanguage
            }
            res.json(result);
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
                .map(language => ({
                    id: language._id,
                    name: language.name,
                    code: language.code,
                    image: language.image && language.imageLink,
                }));
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
            const result = {
                id: language._id,
                name: language.name,
                code: language.code,
                image: language.image && language.imageLink
            }
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/languages',
    async (req, res) => {
        try {
            const imageName = uuidv4() + '.' + req.body.image.title.split('.').reverse()[0];
            const imageBase64 = req.body.image.src.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            await fs.writeFileSync(path.resolve('./public/img/flags/', imageName), imageBase64, {encoding: 'base64'});
            const language = new Language({
                name: req.body.name,
                code: req.body.code,
                image: imageName
            });
            await language.save();

            const result = {
                id: language._id,
                name: language.name,
                code: language.code,
                image: language.image && language.imageLink
            }
            res.json(result);
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
            if (typeof req.body.image === 'object') {
                if (language.image && fs.existsSync(path.resolve('./public/img/flags/', language.image)))
                    fs.unlinkSync(path.resolve('./public/img/flags/', language.image));
                const imageName = uuidv4() + '.' + req.body.image.title.split('.').reverse()[0];
                const imageBase64 = req.body.image.src.replace(/^data:([A-Za-z-+/]+);base64,/, '');
                await fs.writeFileSync(path.resolve('./public/img/flags/', imageName), imageBase64, {encoding: 'base64'});
                language.image = imageName;
            }
            await language.save();

            const result = {
                id: language._id,
                name: language.name,
                code: language.code,
                image: language.image && language.imageLink
            }
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/languages/:id',
    async (req, res) => {
        try {
            const language = await Language.findById(req.params.id);
            if (language.image && fs.existsSync(path.resolve('./public/img/flags/', language.image)))
                fs.unlinkSync(path.resolve('./public/img/flags/', language.image));
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
            const result = (await RefreshToken.find().skip(req.range.offset).limit(req.range.limit))
                .map(refreshToken => ({
                    id: refreshToken._id,
                    refreshToken: refreshToken.refreshToken,
                    user: refreshToken.user,
                    issuedAt: refreshToken.issuedAt
                }));
            const count = await Language.countDocuments();
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
            const result = {
                id: refreshToken._id,
                refreshToken: refreshToken.refreshToken,
                user: refreshToken.user,
                issuedAt: refreshToken.issuedAt
            }
            res.json(result);
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
                .map(story => ({
                    id: story._id,
                    name: story.name,
                    image: story.image && story.imageLink,
                    course: story.course,
                    text: getTextFromStorySentences(story.sentences)
                }));
            const count = await Language.countDocuments();
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
            const result = {
                id: story._id,
                name: story.name,
                image: story.image && story.imageLink,
                course: story.course,
                text: getTextFromStorySentences(story.sentences)
            }
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Users
router.get('/users',
    async (req, res) => {
        try {
            const result = (await User.find().skip(req.range.offset).limit(req.range.limit))
                .map(user => ({
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    course: user.course,
                    isAdmin: user.isAdmin,
                    words: user.words,
                    stories: user.stories
                }));
            const count = await Language.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/users/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const result = {
                id: user._id,
                email: user.email,
                name: user.name,
                course: user.course,
                isAdmin: user.isAdmin,
                words: user.words,
                stories: user.stories
            }
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

// Vocabularies
router.get('/vocabularies',
    async (req, res) => {
        try {
            const result = (await Vocabulary.find().skip(req.range.offset).limit(req.range.limit))
                .map(vocabulary => ({
                    id: vocabulary._id,
                    name: vocabulary.name,
                    course: vocabulary.course,
                    vocabularyGroup: vocabulary.vocabularyGroup,
                    image: vocabulary.image && vocabulary.imageLink,
                    words: vocabulary.words
                }));
            const count = await Language.countDocuments();
            res.sendRange(result, count);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/vocabularies/:id',
    async (req, res) => {
        try {
            const vocabulary = await Vocabulary.findById(req.params.id);
            const result = {
                id: vocabulary._id,
                name: vocabulary.name,
                course: vocabulary.course,
                vocabularyGroup: vocabulary.vocabularyGroup,
                image: vocabulary.image && vocabulary.imageLink,
                words: vocabulary.words
            }
            res.json(result);
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
                .map(vocabularyGroup => ({
                    id: vocabularyGroup._id,
                    name: vocabularyGroup.name,
                    course: vocabularyGroup.course
                }));
            const count = await Language.countDocuments();
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
            const result = {
                id: vocabularyGroup._id,
                name: vocabularyGroup.name,
                course: vocabularyGroup.course
            }
            res.json(result);
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
                .map(word => ({
                    id: word._id,
                    original: word.original,
                    translation: word.translation,
                    course: word.course
                }));
            const count = await Language.countDocuments();
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
            const result = {
                id: word._id,
                original: word.original,
                translation: word.translation,
                course: word.course
            }
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
















router.post('/test',
    async (req, res) => {
        try {
            const story = new Story({
                name: 'People discuss',
                course: '5f6a7da7d3abae2a00f4a6cc',
                sentences: await splitTextIntoSentences('Great minds discuss ideas, average minds discuss events, small minds discuss people.\n' +
                    '\n' +
                    '\n' +
                    'Eleanor Roosevelt')
            });

            await story.save();

            res.json({message: 'Science'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

const getTextFromStorySentences = sentences => sentences.reduce((text, sentence) => {
    if (sentence.isEmpty)
        return text + '\n';
    return text + sentence.parts.reduce((sentenceText, part) => sentenceText + part.text + (part.spaceAfter?' ':''), '')
}, '');

async function splitTextIntoSentences(text) {
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