const {Router} = require('express');
const router = Router();
const {body} = require('express-validator');
const jwtValidationMiddleware = require('../middleware/jwtValidationMiddleware');
const validationResultsCheckMiddleware = require('../middleware/validationResultsCheckMiddleware');
const {checkIfCourseExists} = require('../middleware/documentExistanceMiddleware');
const Course = require('../models/Course');
const User = require('../models/User');

router.use(jwtValidationMiddleware(false, ['/api/user/homepage-courses']));

router.get('/homepage-courses',
    async (req, res) => {
    try {
        const courses = await Course.find().populate('sourceLanguage', 'name image code');
        const result = courses.map(course => {
            return {
                id: course.id,
                name: course.name,
                preferred: true,
                sourceLanguage: {
                    id: course.sourceLanguage.id,
                    name: course.sourceLanguage.name,
                    image: course.sourceLanguage.imageLink,
                    code: course.sourceLanguage.code
                }
            }
        });

        // Set preferred language based on browser preferences
        let preferredLanguageFound = false;
        req.acceptsLanguages()
            .forEach(languageCode => {
                if (!preferredLanguageFound) {
                    courses.forEach((course, idx) => {
                        if(!preferredLanguageFound && course.sourceLanguage.code === languageCode) {
                            result[idx].preferred = true;
                            preferredLanguageFound = true;
                        }
                    })
                }
            })

        res.json(result);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});
router.get('/user-courses',
    async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('words.model', 'course').populate('course', 'id sourceLanguage');
        const allCourses = (await Course.find({sourceLanguage: user.course.sourceLanguage})
            .populate('goalLanguage', 'image')
            .populate('sourceLanguage', 'code'))
            .map(course => ({
                id: course.id,
                name: course.name,
                image: course.goalLanguage.imageLink,
                code: course.sourceLanguage.code
            }));

        const userCourseIds = user.words.map(word => word.model.course);
        const result = {
            currentCourse: allCourses.find(course => course.id === user.course.id),
            userCourses: allCourses.filter(course => course.id !== user.course.id && userCourseIds.includes(course.id)),
            otherCourses: allCourses.filter(course => course.id !== user.course.id && !userCourseIds.includes(course.id))
        };

        res.json(result);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/change-user-course', [
        body('courseId').isMongoId().custom(checkIfCourseExists),
        validationResultsCheckMiddleware
    ],
    async (req, res) => {
        try {
            const newCourseId = req.body.courseId;
            const user = await User.findById(req.user.id).populate('words.model', 'course').populate('course', 'id sourceLanguage');
            const allCourses = (await Course.find({sourceLanguage: user.course.sourceLanguage}).populate('goalLanguage', 'image')).map(course => ({
                id: course.id,
                name: course.name,
                image: course.goalLanguage.imageLink
            }));

            user.course = newCourseId;
            await user.save();

            const userCourseIds = user.words.map(word => word.model.course);
            const result = {
                currentCourse: allCourses.find(course => course.id === newCourseId),
                userCourses: allCourses.filter(course => course.id !== newCourseId && userCourseIds.includes(course.id)),
                otherCourses: allCourses.filter(course => course.id !== newCourseId && !userCourseIds.includes(course.id))
            };

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });


module.exports = router;