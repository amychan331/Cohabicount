var https = require("https");
var queryString = require("querystring");
require('dotenv').config();
var config = require('./config');

function creditOffers() {
  var cardType = "consumer";
  // Assemble the request headers
  var requestHeaders = {
    "Authorization": `Bearer ${config.ACCESS_TOKEN}`,
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json;v=3"
  }

  // Assemble the calling options for the request message
  var options = {
    method: "GET",
    hostname: "api-sandbox.capitalone.com",
    port: 443, // https
    path: "/credit-offers/products/cards/" + encodeURIComponent(cardType),
    headers: requestHeaders
  }

  // Create a request object with a response handler
  var retrieveCardProductsByType = https.request(options, function(response) {

    // Accumulate the response data
    var responseData = "";
    response.on("data", function(data) {
      responseData += data;
    });

    // Process the response data
    response.on("end", function() {
      console.log(responseData);
      return responseData;
    });
  });

  // Make sure the entire message has been sent
  retrieveCardProductsByType.end();
}

module.exports = creditOffers;