const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const routerErrors = require('./errors');
const { validateSignin, validateSignup } = require('../middlewares/validation');

//Вход
router.post('/api/signin', validateSignin, login);

//Регистрация
router.post('/api/signup', validateSignup, createUser);

//Защита авторизацией
router.use(auth);

//Пользователи и фильмы
router.use('api/users', routerUsers);
router.use('api/movies', routerMovies);

//404
router.use('*', routerErrors);


module.exports = router;
