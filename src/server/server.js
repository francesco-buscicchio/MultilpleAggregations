const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const AggregationRoute = require('./AggregationsService/aggregationRoute');



const app = express();

app.use(cors());
var aggregationRoute = new AggregationRoute();
app.use('/aggregation',aggregationRoute.getRouter());

const port = process.env.PORT || 3001;

app.use(express.static('public'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port, () => console.log(`Server In Avvio Sulla Porta: ${port}`));
