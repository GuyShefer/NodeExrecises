const http = require('http');
const port = 3000;
const url = require('url');
const fs = require('fs');
const users = require('./users.json')

function renderHTML(path, response) {
    fs.readFile(path, null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found');
        } else {
            response.write(data);
        }
        response.end();
    });
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const path = url.parse(req.url).pathname;

    if (req.method === 'GET') {
        switch (path) {
            case '/':
                renderHTML('./index.html', res);
                break;
            case '/raw-html':
                res.write('<h1>Welcome</h1>');
                break;
            case '/users':
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.write(JSON.stringify(users.users));
                res.end();
                break;
            default:
                res.writeHead(404);
                res.write('Route not found');
                res.end();
        }
    } else {
        res.writeHead(404);
        res.write('Route not found');
        res.end();
    }
});

server.listen(port, (err) => {
    err ? console.log('Something went wrong') : console.log('Server is listening on port ' + port);
})