const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig')
const User = require('../models/User');
const Word = require('../models/Word');
const Vocabulary = require('../models/Vocabulary');

router.get('/all-vocabularies',
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId);
            const allVocabularies = await Vocabulary.find({course: user.course}).populate('vocabularyGroup');

            const userVocabularyIds = user.words.map(word => word.vocabulary);

            const result = {};

            result.userVocabularies = allVocabularies.filter(vocabulary => userVocabularyIds.includes(vocabulary.id))
                .map(vocabulary => ({
                    id: vocabulary.id,
                    name: vocabulary.name,
                    image: vocabulary.imageLink,
                    count: userVocabularyIds.filter(id => id === vocabulary.id).length
                }))

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
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
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
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
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
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
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
                if (word.vocabulary && word.vocabulary === vocabulary.id) {
                    result.words.push({
                        id: word.model.id,
                        original: word.model.original,
                        translation: word.model.translation,
                        isNew: word.isNew || undefined,
                        isLearning: word.isLearning || undefined,
                        isLearned: word.isLearned || undefined,
                    })
                }
            });
            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });

router.get('/user-words',
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId).populate('words.model words.vocabulary');

            const result = [];
            user.words.forEach(word => {
                if (word.model.course === user.course) {
                    result.push({
                        id: word.model.id,
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
module.exports = router;