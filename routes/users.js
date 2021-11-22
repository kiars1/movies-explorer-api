const router = require('express').Router();
const { validateUser } = require('../middlewares/validation');

const {
  getUserMe, patchUser,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', validateUser, patchUser);

module.exports = router;
