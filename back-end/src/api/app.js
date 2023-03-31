const express = require('express');
const cors = require('cors');

const loginRoute = require('./Routes/LoginRoute');

const app = express();
app.use(express.json());
app.use(loginRoute);

// fonte: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
const corsOptions = {
   origin: '*', 
   credentials: true, // access-control-allow-credentials:true
   optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
