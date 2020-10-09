const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig')
const User = require('../models/User');
const Word = require('../models/Word');
const Vocabulary = require('../models/Vocabulary');

router.use(jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }))

router.get('/words-count/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            let words = user.words;
            if (req.params.id)
                words = words.filter(word => word.vocabulary && word.vocabulary.toString() === req.params.id);

            const result = {};
            result.trainingCards = words.filter(word => !word.trainingCards).length;
            result.trainingConstructor = words.filter(word => !word.trainingConstructor).length;
            result.trainingListening = words.filter(word => !word.trainingListening).length;
            result.trainingTranslationWord = words.filter(word => !word.trainingTranslationWord).length;
            result.trainingWordTranslation = words.filter(word => !word.trainingWordTranslation).length;

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/available-vocabularies/',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('words.vocabulary', 'id name');

            const result = Object.entries(user.words.reduce((acc, word) => {
                if (word.vocabulary && !acc[word.vocabulary.id.toString()])
                    acc[word.vocabulary.id.toString()] = word.vocabulary.name;
                return acc;
            }, {})).map(entry => ({
                id: entry[0],
                name: entry[1]
            }));

            res.json(result);

        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/cards/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('words.model');

            const userWords = shuffleArray(user.words.filter(word => {
                if (req.params.id && (!word.vocabulary || word.vocabulary.toString() !== req.params.id))
                    return false;
                return (word.model.course === user.course && !word.isLearned && !word.trainingCards);
            }));

            const result = [];
            userWords.every(word => {
                if (result.length >= 10)
                    return false;
                result.push({
                    id: word.id,
                    original: word.model.original,
                    translation: word.model.translation
                });
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.put('/cards/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            const userAnswers = req.body;

            user.words.map(word => {
                if (userAnswers.includes(word.id.toString()))
                    word.trainingCards = true;
            });

            await user.save();

            res.json({message: 'Training has been completed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });



function shuffleArray(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

module.exports = router;