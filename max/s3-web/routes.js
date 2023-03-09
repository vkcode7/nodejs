const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></input><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();  
    }

    if(url === '/message' && method ==='POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        }); //on allows us to listen to certain events - data event here

        req.on('end', () => {
            const parsedbody = Buffer.concat(body).toString();
            console.log(parsedbody);
            const message = parsedbody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }

    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-type', 'text/html');
    res.write('<html><head><title>my first page</title></head>');
    res.write('<body><h1>Hello</h1></body></html>')
    res.end();
};

//module.exports = requestHandler;

//exporting multiple things
/*
module.exports = {
    handler: requestHandler,
    someText: 'Some hardcoded text'
};
*/

//or can be exported as
module.exports.handler = requestHandler;
module.exports.someText = 'Some hardcoded text';
