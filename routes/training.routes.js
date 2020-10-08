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

module.exports = router;