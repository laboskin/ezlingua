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


module.exports = router;