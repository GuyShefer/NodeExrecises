const express = require('express');
const router = express.Router();

const workers = [
    {
        id: 0,
        name: 'Guy',
        isActive: false
    },

];

router.get('/', (req, res) => {
    return res.status(200).json(workers)
})

router.get('/:id', (req, res) => {
    if (!isWorkerIdExist(req.params.id)) {
        res.status(400).send("User not found.");
    } else {
        return res.status(200).json(workers[req.params.id])
    }
})

router.post('/', (req, res) => {
    const { id, name } = req.body;

    //validation
    if(!id || !name){
        res.status(400).send('you must enter id and name');
    }
    else if (name.trim().split(' ').length < 2) {
        res.status(400).send("You must enter a full name.");
    }
    else if (isWorkerIdExist(id)) {
        res.status(400).send("Id has already exist.");
    } 
    else {
        workers.push({
            id: id,
            name: name,
            isActive: false
        })
        res.status(200).send("Worker has been added.")
    }

})

const isWorkerIdExist = (id) => {
    return workers.find(worker => {
        return worker.id == id
    })
}


module.exports = router;