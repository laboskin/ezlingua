const {Router} = require('express');
const router = Router();
const jwt = require('express-jwt');
const config = require('config');
const jwtConfig = config.get('jwtConfig')
const Course = require('../models/Course');
const User = require('../models/User');


router.get('/homepage-courses', async (req, res) => {
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
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
    async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('words.model', 'course').populate('course', 'id sourceLanguage');
        const allCourses = (await Course.find({sourceLanguage: user.course.sourceLanguage}).populate('goalLanguage', 'image').populate('sourceLanguage', 'code')).map(course => ({
            id: course.id,
            name: course.name,
            image: course.goalLanguage.imageLink,
            code: course.sourceLanguage.code
        }));
        const result = {};

        result.currentCourse = allCourses.find(course => course.id === user.course.id);

        const userCourseIds = user.words.map(word => word.model.course);
        result.userCourses = allCourses.filter(course => course.id !== user.course.id && userCourseIds.includes(course.id));

        result.otherCourses = allCourses.filter(course => course.id !== user.course.id && !userCourseIds.includes(course.id))

        res.json(result);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

router.post('/change-user-course',
    jwt({ secret: jwtConfig.secret, algorithms: ['HS256'] }),
    async (req, res) => {
        try {
            const newCourseId = req.body.courseId;
            const user = await User.findById(req.user.id).populate('words.model', 'course').populate('course', 'id sourceLanguage');
            const allCourses = (await Course.find({sourceLanguage: user.course.sourceLanguage}).populate('goalLanguage', 'image')).map(course => ({
                id: course.id,
                name: course.name,
                image: course.goalLanguage.imageLink
            }));

            if (!allCourses.find(course => course.id === newCourseId))
                res.status(404).json({message: 'Wrong course id provided'});

            user.course = newCourseId;
            await user.save();

            const result = {};

            result.currentCourse = allCourses.find(course => course.id === newCourseId);

            const userCourseIds = user.words.map(word => word.model.course);
            result.userCourses = allCourses.filter(course => course.id !== newCourseId && userCourseIds.includes(course.id));

            result.otherCourses = allCourses.filter(course => course.id !== newCourseId && !userCourseIds.includes(course.id))

            res.json(result);
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'});
        }
    });


module.exports = router;