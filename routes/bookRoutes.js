const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();
// root directory /book/
router.get('/', bookController.bookIndex);
router.get('/create', bookController.bookCreateGet);
router.post('/create', bookController.bookCreatePost);

//:id to search the parameters
router.get('/:id', bookController.bookById);
router.delete('/:id', bookController.bookDelete);

module.exports = router;