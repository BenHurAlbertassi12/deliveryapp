const express = require('express');
const cors = require('cors');
const loginRoute = require('./Routes/LoginRoute');
const registerRoute = require('./Routes/RegisterRoute');
const ProductRoutes = require('./Routes/ProductRoutes');

// fonte: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
const corsOptions = {
   origin: '*', 
   // credentials: true, // access-control-allow-credentials:true
   // optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json());
app.use(loginRoute);
app.use(registerRoute);
app.use(ProductRoutes);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
