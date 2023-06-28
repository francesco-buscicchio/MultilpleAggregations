var expressApplication = require('express');
const { response } = require("express");
const Aggregation = require("./aggregation.js")


class AggregationRoute {
  router = expressApplication.Router();

  constructor() {

    this.router.get('/mainData', async function (request, response) {
      let aggregation = new Aggregation();
      let result = aggregation.getMainData();
      response.send(result);
    })

  }

  getRouter() {
    return this.router;
  }
}

module.exports = AggregationRoute;
