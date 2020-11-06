const Course = require('../models/Course');
const Language = require('../models/Language');
const RefreshToken = require('../models/RefreshToken');
const Story = require('../models/Story');
const User = require('../models/User');
const Vocabulary = require('../models/Vocabulary');
const VocabularyGroup = require('../models/VocabularyGroup');
const Word = require('../models/Word');

const checkIfCourseExists = async id => (await Course.findById(id))?Promise.resolve():Promise.reject('Course not found');
const checkIfLanguageExists = async id => (await Language.findById(id))?Promise.resolve():Promise.reject('Language not found');
const checkIfRefreshTokenExists = async id => (await RefreshToken.findById(id))?Promise.resolve():Promise.reject('Refresh token not found');
const checkIfStoryExists = async id => (await Story.findById(id))?Promise.resolve():Promise.reject('Story not found');
const checkIfUserExists = async id => (await User.findById(id))?Promise.resolve():Promise.reject('User not found');
const checkIfVocabularyExists = async id => (await Vocabulary.findById(id))?Promise.resolve():Promise.reject('Vocabulary not found');
const checkIfVocabularyGroupExists = async id => (await VocabularyGroup.findById(id))?Promise.resolve():Promise.reject('User not found');
const checkIfWordExists = async id => (await Word.findById(id))?Promise.resolve():Promise.reject('Word not found');

module.exports = {
    checkIfCourseExists,
    checkIfLanguageExists,
    checkIfRefreshTokenExists,
    checkIfStoryExists,
    checkIfUserExists,
    checkIfVocabularyExists,
    checkIfVocabularyGroupExists,
    checkIfWordExists
}
