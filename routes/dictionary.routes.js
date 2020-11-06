const {Router} = require('express');
const router = Router();
const {param, body} = require('express-validator');
const jwtValidationMiddleware = require('../middleware/jwtValidationMiddleware');
const validationResultsCheckMiddleware = require('../middleware/validationResultsCheckMiddleware');
const {checkIfVocabularyExists, checkIfWordExists} = require('../middleware/documentExistanceMiddleware');
const User = require('../models/User');
const Vocabulary = require('../models/Vocabulary');
const Word = require('../models/Word');

router.use(jwtValidationMiddleware());

router.get('/all-vocabularies',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            const allVocabularies = await Vocabulary.find({course: user.course}).populate('vocabularyGroup');
            const userVocabularyIds = Object.keys(user.words.reduce((acc, word) => {
                if (word.vocabulary)
                    acc[word.vocabulary] = true;
                return acc;
            }, {}));

            const result = {
                userVocabularies: allVocabularies.filter(vocabulary => userVocabularyIds.includes(vocabulary.id))
                    .map(vocabulary => ({
                        id: vocabulary.id,
                        name: vocabulary.name,
                        image: vocabulary.imageLink,
                        count: user.words.filter(word => word.vocabulary && word.vocabulary.toString() === vocabulary.id).length
                    })),
                vocabularyGroups: Object.values(allVocabularies.filter(vocabulary => !userVocabularyIds.includes(vocabulary.id))
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
                    }, {}))
            };

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/user-progress',
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).populate('words.model', 'course');

            const result = {
                new: 0,
                learning: 0,
                learned: 0
            };

            user.words.forEach(word => {
                if (word.model.course.toString() !== user.course.toString())
                    return;
                if (word.isNew)
                    result.new++
                else if (word.isLearning)
                    result.learning++;
                else
                    result.learned++;
            });

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/vocabulary/:id', [
        param('id').isMongoId().custom(checkIfVocabularyExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const vocabulary = await Vocabulary.findOne({_id: req.params.id, course: user.course}).populate('words');

            const userWordIds = user.words.filter(word => word.vocabulary && word.vocabulary.toString() === vocabulary.id).map(word => word.model.toString());

            const result = {
                id: vocabulary.id,
                name: vocabulary.name,
                image: vocabulary.imageLink,
                isUserVocabulary: userWordIds.length > 0 || undefined,
                words: vocabulary.words.map(word => ({
                    id: word.id,
                    original: word.original,
                    translation: word.translation,
                    isUserWord: userWordIds.includes(word.id.toString()) || undefined
                }))
            }

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/user-vocabulary/:id', [
        param('id').isMongoId().custom(checkIfVocabularyExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const vocabulary = await Vocabulary.findOne({_id: req.params.id, course: user.course}).populate('words');

            const result = {
                id: vocabulary.id,
                name: vocabulary.name,
                image: vocabulary.imageLink,
                words: vocabulary.words.reduce((acc, word) => {
                    const userWord = user.words.find(userWord => userWord.vocabulary
                        && userWord.vocabulary.toString() === vocabulary.id.toString()
                        && userWord.model.toString() === word.id.toString());
                    if (userWord) {
                        return [...acc, {
                            id: userWord.id,
                            original: word.original,
                            translation: word.translation,
                            isNew: userWord.isNew || undefined,
                            isLearning: userWord.isLearning || undefined,
                            isLearned: userWord.isLearned || undefined,
                            trainingCards: userWord.trainingCards || undefined,
                            trainingConstructor: userWord.trainingConstructor || undefined,
                            trainingListening: userWord.trainingListening || undefined,
                            trainingTranslationWord: userWord.trainingTranslationWord || undefined,
                            trainingWordTranslation: userWord.trainingWordTranslation || undefined,
                        }];
                    }
                    return acc;
                }, [])
            }

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
            const user = await User.findById(req.user.id).populate('words.model words.vocabulary');

            const result = user.words.reverse().reduce((acc, word) => {
                if (word.model.course.toString() === user.course.toString())
                    return [...acc, {
                        id: word.id,
                        original: word.model.original,
                        translation: word.model.translation,
                        isNew: word.isNew || undefined,
                        isLearning: word.isLearning || undefined,
                        isLearned: word.isLearned || undefined,
                        trainingCards: word.trainingCards || undefined,
                        trainingConstructor: word.trainingConstructor || undefined,
                        trainingListening: word.trainingListening || undefined,
                        trainingTranslationWord: word.trainingTranslationWord || undefined,
                        trainingWordTranslation: word.trainingWordTranslation || undefined,
                        vocabulary: word.vocabulary && {
                            id: word.vocabulary.id,
                            name: word.vocabulary.name,
                            image: word.vocabulary.image
                        } || undefined
                    }];
                return acc;
            }, []);

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/learn-word/:id', [
        param('id').isMongoId().custom(checkIfWordExists),
        body('vocabulary').isMongoId().custom(checkIfVocabularyExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const word = await Word.findById(req.params.id);

            const userWord = { model: word.id };

            if (req.body.vocabulary) {
                if (user.words.find(w => w.model === word.id && w.vocabulary === req.body.vocabulary))
                    return res.status(404).json({message: 'Word has been added already'});
                userWord.vocabulary = req.body.vocabulary;
            }

            user.words.push(userWord);
            await user.save();

            res.status(201).json({message: 'Word was successfully added'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/remove-word/:id', [
        param('id').isMongoId(),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user.words.find(word => word.id.toString() === req.params.id))
                return res.status(404).json({message: 'Word not found'});

            user.words = user.words.filter(word => word.id.toString() !== req.params.id);
            await user.save();

            res.status(201).json({message: 'Word was successfully removed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.post('/learn-vocabulary/:id', [
        param('id').isMongoId().custom(checkIfVocabularyExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const vocabulary = await Vocabulary.findById(req.params.id);

            if (user.words.find(word => word.vocabulary === req.params.id))
                return res.status(404).json({message: 'Vocabulary has been added already'});

            vocabulary.words.reverse().forEach(word => {
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

router.post('/remove-vocabulary/:id', [
        param('id').isMongoId().custom(checkIfVocabularyExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id);

            if (!user.words.find(word => word.vocabulary && word.vocabulary.toString() === req.params.id))
                res.status(404).json({message: 'User does not have the vocabulary'});

            user.words = user.words.filter(word => !word.vocabulary || word.vocabulary.toString() !== req.params.id);
            await user.save();

            res.status(201).json({message: 'Vocabulary was successfully removed'});
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

module.exports = router;