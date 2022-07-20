const express = require('express');
const router = express.Router();
const HistoryController = require('../controllers/history')
const Auth = require('../middlewares/autentication')

router.get ('/', Auth.authentication, HistoryController.getMyHistories)
router.get ('/:id', Auth.authentication, Auth.historyAuthorization, HistoryController.getHistoryById)

module.exports = router