const express = require('express');
const router = express.Router();
const workersController = require('../controllers/workers.controller');

router.get('/', (req, res) => {
    workersController.getAllWorkers(req,res);
})

router.get('/:id', (req, res) => {
    workersController.getWorkerById(req,res,req.params.id);
})

router.post('/', (req, res) => {
    workersController.createWorker(req,res);
})

module.exports = router;