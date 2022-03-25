const Router = require('express');
const router = new Router();
const subjectsController = require('../controllers/subjects-controller.js')

router.get('/subjects', subjectsController.getAllSubjects);
router.post('/subjects', subjectsController.createSubject);
router.delete('/subjects/:id', subjectsController.deleteSubjectById);
router.put('/subjects/:id', subjectsController.updateSubjectById);


module.exports = router