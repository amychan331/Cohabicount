var https = require("https");
var queryString = require("querystring");

module.exports.creditOffers = function() {
  var cardType = "consumer";
  // Assemble the request headers
  var requestHeaders = {
    "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
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
  var retrieveCardProductsByType = https.request(options, (response) => {

    // Accumulate the response data
    var results = "";
    response.on("data", (data) => {
      results += data;
    });

    // Console log if error occurs
    response.on("error", (e) => {
      console.log(e);
    })

    // Process the response data
    response.on("end", () => {
      var jsonOffers = (JSON.parse(results)).products;
      if (jsonOffers) {
        var formatOffers = "";
        for (const key of Object.keys(jsonOffers)) {
          formatOffers += jsonOffers[key] + "\n";
        }
        console.log(formatOffers);

        return formatOffers;
      }
      // Object not found. Console.log Capital One API's description key to see error message.
      return results.description;
    });
  });

  // Make sure the entire message has been sent
  retrieveCardProductsByType.end();
}