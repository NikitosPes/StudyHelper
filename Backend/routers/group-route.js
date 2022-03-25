const Router = require('express');
const router = new Router();
const groupController = require('../controllers/groupe-controller.js')

router.post('/group', groupController.createStudent);
router.get('/group', groupController.getAllStudentsFromGroup);
router.delete('/group/:id', groupController.deleteStudent);
router.put('/group/:id', groupController.updateStudent)

module.exports = router