const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig')
const User = require('../models/User');
const Word = require('../models/Word');
const Vocabulary = require('../models/Vocabulary');

router.use(jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }))

router.get('/all-vocabularies',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            const allVocabularies = await Vocabulary.find({course: user.course}).populate('vocabularyGroup');

            const userVocabularyIds = Object.keys(user.words.reduce((acc, word) => {
                if (word.vocabulary) acc[word.vocabulary] = true;
                return acc;
            }, {}));

            const result = {};

            result.userVocabularies = allVocabularies.filter(vocabulary => userVocabularyIds.includes(vocabulary.id))
                .map(vocabulary => ({
                        id: vocabulary.id,
                        name: vocabulary.name,
                        image: vocabulary.imageLink,
                        count: user.words.filter(word => word.vocabulary && word.vocabulary.toString() === vocabulary.id).length
                    }));
            result.vocabularyGroups = Object.values(allVocabularies.filter(vocabulary => !userVocabularyIds.includes(vocabulary.id))
                .reduce((groups,vocabulary) => {
                    if (!groups[vocabulary.vocabularyGroup.id])
                        groups[vocabulary.vocabularyGroup.id] = {
                            id: vocabulary.vocabularyGroup.id,
                            name: vocabulary.vocabularyGroup.name,
                            vocabularies: [{
                                id: vocabulary.id,
                                name: vocabulary.name,
                                image: vocabulary.imageLink,
                                count: vocabulary.words.length
                            }]
                        };
                    else
                        groups[vocabulary.vocabularyGroup.id].vocabularies.push({
                            id: vocabulary.id,
                            name: vocabulary.name,
                            image: vocabulary.imageLink,
                            count: vocabulary.words.length
                        });
                    return groups;
                }, {}));

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/user-progress',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            const result = {};
            result.new = 0;
            result.learning = 0;
            result.learned = 0;

            user.words.forEach(word => {
                if (word.isNew)
                    result.new++
                else if (word.isLearning)
                    result.learning++;
                else
                    result.learned++;
            })

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/vocabulary/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            const vocabulary = await Vocabulary.findOne({_id: req.params.id, course: user.course}).populate('words');

            if (!vocabulary) return res.status(404).json({message: 'Vocabulary not found'});

            const result = {};
            result.id = vocabulary.id;
            result.name = vocabulary.name;
            result.image = vocabulary.imageLink;
            result.userVocabulary = user.words.find(word => word.vocabulary === vocabulary.id);

            const userWordIds = user.words.filter(word => word.vocabulary === vocabulary.id).map(word => word.model);

            result.words = vocabulary.words.map(word => ({
                id: word.id,
                original: word.original,
                translation: word.translation,
                userWord: userWordIds.includes(word.id) || undefined
            }));

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/user-vocabulary/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('words.model');
            const vocabulary = await Vocabulary.findOne({_id: req.params.id, course: user.course});

            if (!vocabulary) return res.status(404).json({message: 'Vocabulary not found'});

            const result = {};
            result.id = vocabulary.id;
            result.name = vocabulary.name;
            result.image = vocabulary.imageLink;
            result.words = []
            user.words.forEach(word => {
                if (word.vocabulary && word.vocabulary.toString() === vocabulary.id) {
                    result.words.push({
                        id: word.id,
                        original: word.model.original,
                        translation: word.model.translation,
                        isNew: word.isNew || undefined,
                        isLearning: word.isLearning || undefined,
                        isLearned: word.isLearned || undefined,
                    })
                }
            });
            if (vocabulary.words.length > result.words.length)
                result.fullVocabulary = vocabulary.words.length;
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/user-words',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('words.model words.vocabulary');

            const result = [];
            user.words.forEach(word => {
                if (word.model.course.toString() === user.course.toString()) {
                    result.push({
                        id: word.id,
                        original: word.model.original,
                        translation: word.model.translation,
                        isNew: word.isNew || undefined,
                        isLearning: word.isLearning || undefined,
                        isLearned: word.isLearned || undefined,
                        vocabulary: word.vocabulary && {
                            id: word.vocabulary.id,
                            name: word.vocabulary.name,
                            image: word.vocabulary.image
                        } || undefined
                    })
                }
            });
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/learn-word/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            const word = Word.findById(req.params.id);
            if (!word) return res.status(404).json({message: 'Word not found'});
            const userWord = { model: word.id };

            if (req.body.vocabulary) {
                const vocabulary = await Vocabulary.findById(req.body.vocabulary);
                if (vocabulary && vocabulary.words.includes(word.id)) {
                    if (user.words.find(w => w.model === word.id && w.vocabulary === vocabulary.id))
                        return res.status(404).json({message: 'Word has been added already'});
                    userWord.vocabulary = vocabulary.id;
                }
            }

            user.words.push(userWord);
            await user.save();
            res.status(201).json({message: 'Word was successfully added'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/remove-word/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            if (!user.words.find(word => word.id.toString() === req.params.id))
                res.status(404).json({message: 'Word not found'});

            user.words = user.words.filter(word => word.id.toString() !== req.params.id);
            await user.save();

            res.status(201).json({message: 'Word was successfully removed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/learn-vocabulary/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            if (user.words.find(word => word.vocabulary === req.params.id))
                return res.status(404).json({message: 'Vocabulary has been added already'});

            const vocabulary = await Vocabulary.findById(req.params.id);
            if (!vocabulary)
                return res.status(404).json({message: 'Vocabulary not found'});

            vocabulary.words.forEach(word => {
                user.words.push({
                    model: word,
                    vocabulary: vocabulary.id
                })
            });

            user.save()
            res.status(201).json({message: 'Vocabulary was successfully added'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/remove-vocabulary/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);

            if (!user.words.find(word => !word.vocabulary || word.vocabulary.toString() === req.params.id))
                res.status(404).json({message: 'Vocabulary not found'});

            user.words = user.words.filter(word => !word.vocabulary || word.vocabulary.toString() !== req.params.id);
            await user.save();

            res.status(201).json({message: 'Vocabulary was successfully removed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });
module.exports = router;