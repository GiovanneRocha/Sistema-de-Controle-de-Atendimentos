const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const routes = require('../backend/routes'); // supondo que seus arquivos estão em /backend

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

module.exports = serverless(app);