const express = require('express');
const router = express.Router();
const usersJson = require('../users.json');
const fs = require('fs');


router.get('/', (req, res) => {
    return res.status(200).json({ users: usersJson.users })
}).get('/:id', (req, res) => {
    return res.status(200).json({ user: usersJson.users[req.params.id] })
}).post('/', (req, res) => {
    console.log(req.body);
    usersJson.users.push(req.body);
    fs.writeFileSync('../users.json', usersJson.users.push(req.body))
    // return res.status(201).json({confirm: 'asd'})
    res.send(usersJson.users)
}).put('/:id', (req, res) => {
    const { id } = req.params;
    const { capsule } = req.body;
    usersJson.users.filter(user => user.id == id).map(user => user.capsule = capsule);
    // if the body is empty
    // if the id is empty
    // if the capsule isnt exist
    // if the user isnt exist
    // set capsule string instead integer
    // the 'capsule' key word is not match
    console.log("id :", typeof id)
    console.log("capsule :", capsule)
    console.log("userList", usersJson);

    res.send("user has bben updated")
}).delete('/:id', (req, res) => {
    const {id} = req.params;
    const index2 = usersJson.users.indexOf(usersJson.users.filter(user => user.id == id)[0]);
    usersJson.users.splice(index2,1);
    console.log(usersJson.users);
    res.send("user has bben deleted")
})


module.exports = router;