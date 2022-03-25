const router = require('express').Router();
const {
	registerUser,
	loginUser,
	getMe,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', registerUser);
router.post('/login', loginUser);
router.post('/me', protect, getMe);

module.exports = router;
