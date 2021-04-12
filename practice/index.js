const { equal } = require('assert');
const http = require('http');
const port = 8001;
const url = require('url')
const users = (require('./users')).users;



// const users = [
//     { id: 0, name: 'Michael', capsuleNumber: 1 },
//     { id: 1, name: 'Gilad', capsuleNumber: 1 },
//     { id: 2, name: 'Taly', capsuleNumber: 1 },
//     { id: 3, name: 'Shir', capsuleNumber: 1 },
//     { id: 4, name: 'Osama', capsuleNumber: 1 },
//     { id: 5, name: 'Guy', capsuleNumber: 1 },
//     { id: 6, name: 'Shlomi', capsuleNumber: 2 },
//     { id: 7, name: 'Or', capsuleNumber: 2 },
//     { id: 8, name: 'Rachel', capsuleNumber: 2 },
// ]

// console.log(users1);

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    console.log(query.id);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (req.method === 'GET') {
        if (req.url === '/getAll') {
            res.write('HEY');
        }
        else if (req.url === '/getUsers') {
            res.write(JSON.stringify(users));
        }
        else if (req.url.includes('user')) {
            res.write(JSON.stringify(users[query.id]));
        }
        else if(req.url.includes('byCapsule')){
            res.write(JSON.stringify(users.filter(user => user.capsuleNumber == query.id)));
        }
    }
    res.end();
})

server.listen(port, () => {
    console.log('server run on port ' + port);
})