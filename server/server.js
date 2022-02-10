const express = require("express");
const cors = require('cors');
const port = 4004;

const app = express();

app.use(cors());
app.use(express.json()); //take in JSON on a request and parse it

const ctrl = require('./controller.js');

app.post('/api/messages', ctrl.createMessage);

app.listen(port, console.log(`New machine override on port ${port}`));
