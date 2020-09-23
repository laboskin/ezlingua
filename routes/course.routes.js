const {Router} = require('express');
const router = Router();
const Course = require('../models/Course');

router.get('/all', async (req, res) => {
    try {
        let courses = await Course.find().populate('goalLanguage sourceLanguage', 'name image');
        courses = courses.map(course => {
            return {
                id: course.id,
                name: course.name,
                preferred: true,
                goalLanguage: {
                    id: course.goalLanguage.id,
                    name: course.goalLanguage.name,
                    image: course.goalLanguage.imageLink
                },
                sourceLanguage: {
                    id: course.sourceLanguage.id,
                    name: course.sourceLanguage.name,
                    image: course.sourceLanguage.imageLink
                }
            }
        });
        console.log(courses);
        res.json(courses);
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;