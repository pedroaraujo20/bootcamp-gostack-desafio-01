const express = require('express');

const server = express();

server.use(express.json());

const products = [];

server.listen(3000);