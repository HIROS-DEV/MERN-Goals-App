const router = require('express').Router();

const {
	getGoals,
	postGoal,
	getGoal,
	updateGoal,
	deleteGoal,
} = require('../controllers/goalController');

router.route('/').get(getGoals).post(postGoal);
router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal);

module.exports = router;
