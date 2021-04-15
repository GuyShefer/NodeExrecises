const express = require('express');
const router = express.Router();
// const workersData = require('./workers.json');
const roomsData = require('./rooms.json')
const fs = require('fs');

// const workers = workersData.workers;
const rooms = roomsData.rooms;

router.post('/', (req, res) => {

    const { roomNumber, maxWorkers, isActive } = req.body;

    if (isRoomExist(roomNumber)) {
        res.status(400).send("Room number has already exist");
    } else {
        const room = {
            roomNumber: roomNumber,
            maxWorkers: maxWorkers,
            isActive: isActive,
            workers: []
        }

        const tempJson = roomsData;
        tempJson.rooms.push(room);

        fs.writeFileSync('./routes/rooms.json', JSON.stringify(tempJson));
        res.status(200).send("Room has been added.");
    }

})

router.put('/addWorker/:roomNumber/:workerId', (req, res) => {
    // have to add validation:
    // if the roomnumber or the workerid is null
    // if the user isnt exist
    // if the worker isnt exist
    // if the user is already exist in the room
    const worker = findWorker(req.params.workerId);
    const roomTempJson = roomsData;

    roomTempJson.rooms.map(room => {
        if(room.roomNumber == req.params.roomNumber) {
            room.workers.push(worker);
        }
    })

    fs.writeFileSync('./routes/rooms.json', JSON.stringify(roomTempJson));
    res.status(200).send("Worker has been added to the room.");
})

router.put('/removeWorker/:roomNumber/:workerId', (req, res) => {
    // have to add validation:
    // if the roomnumber or the workerid is null
    // if the user isnt exist
    // if the worker isnt exist
    // if the user is not exist in the room
    const worker = findWorker(req.params.workerId);
    const roomTempJson = roomsData;
    
    roomTempJson.rooms.map(room => {
        if(room.roomNumber == req.params.roomNumber) {
            room.workers.push(worker);
        }
    })

    fs.writeFileSync('./routes/rooms.json', JSON.stringify(roomTempJson));
    res.status(200).send("Worker has been added to the room.");
})


const findWorker = (id) => {
    return workers.filter(worker => {
        return worker.id == id;
    })
}

const isRoomExist = (id) => {
    return rooms.find(room => {
        return room.roomNumber == id;
    })
}




module.exports = router;