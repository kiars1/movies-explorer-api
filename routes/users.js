const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUser } = require('../middlewares/validation');

const {
    getUserMe, patchUser,
} = require('../controllers/users');

router.get('api/me', getUserMe);

router.patch('api/me', validateUser, patchUser);

module.exports = router;