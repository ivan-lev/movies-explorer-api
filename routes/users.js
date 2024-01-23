const router = require('express').Router();

const {
  validateJoiUpdateUserInfo,
} = require('../middlewares/joi-users-validation');

const {
  getUserInfo,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', validateJoiUpdateUserInfo, updateUserInfo);

module.exports = router;
