const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const workersRoute = require('./routes/workers.routes');
const roomsRoute = require('./routes/rooms.routes');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/workers', workersRoute);
app.use('/api/rooms', roomsRoute);

app.listen(port,()=>{
    console.log(`application start at ${port}`)
})
