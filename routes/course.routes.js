const {Router} = require('express');
const router = Router();
const Course = require('../models/Course');

router.get('/homepage', async (req, res) => {
    try {
        const courses = await Course.find().populate('sourceLanguage', 'name image');
        const result = courses.map(course => {
            return {
                id: course.id,
                name: course.name,
                preferred: true,
                sourceLanguage: {
                    id: course.sourceLanguage.id,
                    name: course.sourceLanguage.name,
                    image: course.sourceLanguage.imageLink
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

module.exports = router;