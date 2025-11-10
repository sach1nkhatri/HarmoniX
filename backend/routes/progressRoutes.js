const router = require('express').Router();
const ctrl = require('../controllers/lessonController');

router.get('/', ctrl.getProgress);
router.post('/', ctrl.updateProgress);

module.exports = router;


