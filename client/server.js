const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const api = require('../server/routes/api');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));

app.use('/api', api);

app.use(express.static('dist/client'));

// Must be last
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/client/index.html'));
});

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('Started'));