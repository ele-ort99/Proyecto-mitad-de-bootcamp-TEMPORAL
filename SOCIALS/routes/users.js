const express = require('express');
const uploadImg = require('../middlewares/uploadImg');
const usersController = require('../controllers/users.controller');
const router = express.Router();

// Registro de usuarios
router.get('/register', usersController.openFormRegister);
router.post('/register', uploadImg("usuarios"), usersController.register);

// Visualización de un usuario
router.get('/user/:id', usersController.openUser);

//Editar un usuario
router.get('/editUser/:id_user', usersController.openEditUser)
router.post('/editUser/:id_user', usersController.editUser)

// Añadir juego
router.get('/openAddGame/:userId', usersController.openAddGame);
router.post('/addGame/:userId', uploadImg("juegos"), usersController.addGame);

//Borrar jugador
router.get('/elimTotalUser/:id_user', usersController.elimTotalUser)


module.exports = router;
