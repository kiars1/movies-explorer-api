const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerErrors = require('./errors');
const { validateSignin, validateSignup } = require('../middlewares/validation');

router.post('/api/signin', validateSignin, login);

router.post('/api/signup', validateSignup, createUser);

router.use(auth);

router.use('/api/users', routerUsers);
router.use('/api/movies', routerMovies);

router.use('*', routerErrors);

module.exports = router;
