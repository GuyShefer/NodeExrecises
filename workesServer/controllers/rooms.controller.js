const roomsData = require('../data/rooms.json');
const fs = require('fs');
const rooms = roomsData.rooms;
const workersController = require('../controllers/workers.controller');

const createRoom = (req, res) => {
    const { roomNumber, maxWorkers, isActive } = req.body;

    if (!roomNumber || !maxWorkers || isActive === null) {
        res.status(406).send('you must enter room number,max workers and if the room is active');
    }
    else if (isRoomExist(roomNumber)) {
        res.status(406).send("Room number has already exist");
    } else {
        const room = {
            roomNumber: roomNumber,
            maxWorkers: maxWorkers,
            isActive: isActive,
            workers: []
        }

        const tempRoomsJson = roomsData;
        tempRoomsJson.rooms.push(room);

        fs.writeFileSync('./data/rooms.json', JSON.stringify(tempRoomsJson));
        res.status(200).send("Room has been added successfully.");
    }
}

const addWorkerToTheRoom = (req, res) => {
    const workerId = req.params.workerId;
    const roomId = req.params.roomNumber;

    if (!workerId || !roomId) {
        return res.status(406).send('you must enter room number and worker id.');
    }

    const worker = workersController.getWorkerById(req, res, workerId);
    if (!worker) {
        res.status(406).send("Worker is not exist.");
    } else if (!isRoomExist(roomId)) {
        res.status(406).send("Room number is not exist.");
    } else {

        roomsData.rooms.map(room => {
            if (room.roomNumber == roomId) {
                room.workers.push(worker[0]);
            }
            return room;
        })

        fs.writeFileSync('./data/rooms.json', JSON.stringify(roomsData));

        res.status(200).send("Worker has been added to the room.");
    }
}

const deleteWorkerFromTheRoom = (req, res) => {
    const workerId = req.params.workerId;
    const roomId = req.params.roomNumber;
    if (!workerId || !roomId) {
        return res.status(406).send('you must enter room number and worker id.');
    }

    const worker = workersController.getWorkerById(req, res, workerId);
    if (!worker) {
        res.status(406).send("Worker is not exist.");
    } else if (!isRoomExist(roomId)) {
        res.status(406).send("Room number is not exist.");
    } else if (!isWorkerExistInTheRoom(workerId, roomId)) {
        res.status(406).send("Room not cotains this worker.");
    }

    roomsData.rooms.map(room => {
        if (room.roomNumber == roomId) {
            room.workers.forEach((worker, index) => {
                if (worker.id == workerId) {
                    room.workers.splice(index, 1);
                    return;
                }
            })
            return room;
        }
        else {
            return room;
        }
    })

    fs.writeFileSync('./data/rooms.json', JSON.stringify(roomsData));

    res.status(200).send("Worker has been removed from the room.");
}

const getAllRooms = (req,res) => {
    return res.status(200).json(rooms);
}

const isRoomExist = (id) => {
    return rooms.find(room => {
        return room.roomNumber == id;
    })
}

const isWorkerExistInTheRoom = (workerId, roomId) => {
    let userExist = false;
    rooms.forEach(room => {
        if (room.roomNumber == roomId) {
            room.workers.forEach(worker => {
                if (worker.id == workerId) {
                    userExist = true;
                }
            })
        }
    })
    return userExist;
}

module.exports = {
    createRoom,
    addWorkerToTheRoom,
    deleteWorkerFromTheRoom,
    getAllRooms,
}