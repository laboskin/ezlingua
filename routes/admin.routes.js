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

router.get('/languages/:id',
    async (req, res) => {
        try {
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.get('/languages',
    async (req, res) => {
        try {
            res.json([]);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.post('/languages',
    async (req, res) => {
        try {
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.put('/languages',
    async (req, res) => {
        try {
            res.json({});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
router.delete('/languages',
    async (req, res) => {
        try {
            res.json({});
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