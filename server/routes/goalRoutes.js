const router = require('express').Router();

const {
	getGoals,
	postGoal,
	getGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goalController');

const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, postGoal);
router
	.route('/:id')
	.get(protect, getGoal)
	.put(protect, updateGoal)
	.delete(protect, deleteGoal);

module.exports = router;
