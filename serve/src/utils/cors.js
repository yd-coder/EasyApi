const express = require('express');
const cors = require('cors');
const corsOrigin = express();

const corsOptions = {
  origin: '*' 
};

corsOrigin.use(cors(corsOptions));

module.exports = {
    corsOrigin
}