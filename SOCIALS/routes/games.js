const gameController = require('../controllers/games.controller')
const express = require('express')
const uploadImg = require('../middlewares/uploadImg')
const router = express.Router();

router.get('/addNewGameSelect', gameController.openAddNewGameSelect)
router.post('/addNewGameSelect', uploadImg("juegos"), gameController.addNewGameSelect)
router.get('/editGame/:id_game', gameController.openEditGame)
router.post('/editGame/:id_game/:id_user', gameController.editGame)
router.get('/elimTotalGame/:id_game/:id_user', gameController.elimTotalGame)
router.get('/elimGame/:id_game/:id_user', gameController.elimGame)




module.exports = router;