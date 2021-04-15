const workersData = require('../data/workers.json');
const fs = require('fs');
const workers = workersData.workers;

const getAllWorkers = (req, res) => {
    return res.status(200).json(workers);
}

const getWorkerById = (req, res, id) => {
    if (!isWorkerExistById(id)) {
        res.status(204).send('User Not Found.');
    } else {
        const worker = workers.filter(worker => worker.id == id);
        return res.status(200).json(worker);
    }
}

const isWorkerExistById = (id) => {
    return workers.find(worker => {
        return worker.id == id
    })
}

const createWorker = (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(406).send('you must enter id and name');
    }
    else if (name.trim().split(' ').length < 2) {
        return res.status(406).send("You must enter a full name.");
    }
    else if (isWorkerExistById(id)) {
        return res.status(406).send("Id has already exist.");
    }
    else {
        const worker = {
            id: id,
            name: name,
            isActive: false
        }

        const tempWorkersJSON = workersData;
        tempWorkersJSON.workers.push(worker);
        console.log(tempWorkersJSON);

        fs.writeFileSync('./data/workers.json', JSON.stringify(tempWorkersJSON));
        res.status(200).send("Worker has been added.");
    }

}

module.exports = {
    getAllWorkers,
    getWorkerById,
    createWorker,
}