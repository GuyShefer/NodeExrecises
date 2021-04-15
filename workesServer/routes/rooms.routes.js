const express = require('express');
const router = express.Router();
const roomsController = require('../controllers/rooms.controller');

router.post('/', (req, res) => {
    roomsController.createRoom(req, res);
})

router.put('/addWorker/:roomNumber/:workerId', (req, res) => {
    roomsController.addWorkerToTheRoom(req, res);
})

router.put('/removeWorker/:roomNumber/:workerId', (req, res) => {
    roomsController.deleteWorkerFromTheRoom(req, res);
})

router.get('/', (req, res) => {
    roomsController.getAllRooms(req,res);
})

module.exports = router;