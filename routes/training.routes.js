const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig')
const User = require('../models/User');
const Word = require('../models/Word');

router.use(jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }))

router.get('/words-count/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('words.model', 'course');
            let words = user.words.filter(word => word.model.course.toString() === user.course.toString());
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
            const user = await User.findById(req.user.id).populate('words.vocabulary', 'id name');

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
            const user = await User.findById(req.user.id).populate('words.model');

            const userWords = shuffleArray(user.words.filter(word => {
                if (req.params.id && (!word.vocabulary || word.vocabulary.toString() !== req.params.id))
                    return false;
                return (word.model.course.toString() === user.course.toString() && !word.isLearned && !word.trainingCards);
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
                return true;
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/constructor/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('words.model');

            const userWords = shuffleArray(user.words.filter(word => {
                if (req.params.id && (!word.vocabulary || word.vocabulary.toString() !== req.params.id))
                    return false;
                return (word.model.course.toString() === user.course.toString() && !word.isLearned && !word.trainingConstructor);
            }));

            const result = [];
            userWords.every(word => {
                if (result.length >= 10)
                    return false;
                const letterOptions = shuffleArray(word.model.original.split('').reduce((acc, letter) => {
                    if (acc.find(l => l.text === letter.toLowerCase()))
                        return acc.map(l => l.text !== letter.toLowerCase()?l:{text: l.text, count: l.count+1});
                    return [...acc, {text: letter.toLowerCase(), count: 1}];
                }, []));
                result.push({
                    id: word.id,
                    original: word.model.original,
                    translation: word.model.translation,
                    letterOptions,
                    letterGuessed: 0,
                    letterMistakesCount: 0,
                });
                return true;
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/word-translation/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('words.model');
            const sameCourseWords = await Word.find({course: user.course});

            const userWords = shuffleArray(user.words.filter(word => {
                if (req.params.id && (!word.vocabulary || word.vocabulary.toString() !== req.params.id))
                    return false;
                return (word.model.course.toString() === user.course.toString() && !word.isLearned && !word.trainingWordTranslation);
            }));

            const result = [];
            userWords.every(word => {
                if (result.length >= 10)
                    return false;

                const options = shuffleArray(sameCourseWords.filter(w => w.original !== word.model.original && w.translation !== word.model.translation)).slice(0, 3).map(w => w.translation);

                result.push({
                    id: word.id,
                    original: word.model.original,
                    translation: word.model.translation,
                    options: shuffleArray([word.model.translation, ...options])
                });
                return true;
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/translation-word/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('words.model');
            const sameCourseWords = await Word.find({course: user.course});

            const userWords = shuffleArray(user.words.filter(word => {
                if (req.params.id && (!word.vocabulary || word.vocabulary.toString() !== req.params.id))
                    return false;
                return (word.model.course.toString() === user.course.toString() && !word.isLearned && !word.trainingTranslationWord);
            }));

            const result = [];
            userWords.every(word => {
                if (result.length >= 10)
                    return false;

                const options = shuffleArray(sameCourseWords.filter(w => w.original !== word.model.original && w.translation !== word.model.translation)).slice(0, 3).map(w => w.original);

                result.push({
                    id: word.id,
                    original: word.model.original,
                    translation: word.model.translation,
                    options: shuffleArray([word.model.original, ...options])
                });
                return true;
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/listening/:id?',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('words.model');
            const sameCourseWords = await Word.find({course: user.course});

            const userWords = shuffleArray(user.words.filter(word => {
                if (req.params.id && (!word.vocabulary || word.vocabulary.toString() !== req.params.id))
                    return false;
                return (word.model.course.toString() === user.course.toString() && !word.isLearned && !word.trainingListening);
            }));

            const result = [];
            userWords.every(word => {
                if (result.length >= 10)
                    return false;

                const options = shuffleArray(sameCourseWords.filter(w => w.original !== word.model.original && w.translation !== word.model.translation)).slice(0, 3).map(w => w.translation);

                result.push({
                    id: word.id,
                    original: word.model.original,
                    translation: word.model.translation,
                    options: shuffleArray([word.model.translation, ...options])
                });
                return true;
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/:trainingName/',
    async (req, res) => {
        try {
            let fieldName;
            switch(req.params.trainingName) {
                case 'cards':
                    fieldName = 'trainingCards';
                    break;
                case 'constructor':
                    fieldName = 'trainingConstructor';
                    break;
                case 'listening':
                    fieldName = 'trainingListening';
                    break;
                case 'translation-word':
                    fieldName = 'trainingTranslationWord';
                    break;
                case 'word-translation':
                    fieldName = 'trainingWordTranslation';
                    break;
                default:
                    throw new Error('Wrong training name');
            }

            const user = await User.findById(req.user.id);

            const userAnswers = req.body;

            user.words.map(word => {
                if (userAnswers.includes(word.id.toString()))
                    word[fieldName] = true;
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