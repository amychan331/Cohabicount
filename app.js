/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework.
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var creditOffers = require("./credit_offers.json");
var moneyMover = require("./money_mover.json");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot.
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);
bot.set('storage', tableStorage);

bot.dialog('/', function (session) {
  if (session.message.text === "Credit Offer") {
    var result = creditOffers.products;
    var printObj = '';
    Object.keys(result).forEach(function(key) {
      printObj += ("productId" + ": " + result[key]["productId"] + "\n");
      printObj += ("productDisplayName" + ": " + result[key]["productDisplayName"] + "\n");
      printObj += ("applyNowLink" + ": " + result[key]["applyNowLink"] + "\n");
      printObj += ("-------------------------\n");
    });
    session.send(printObj);

    // creditOffers().then(
    //   function(json) {
    //     var result = json.products;
    //     var printObj = '';
    //     Object.keys(result).forEach(function(key) {
    //        printObj += (key + ": " + result[key] + "\n");
    //     });
    //     session.send(printObj);
    //   },
    //   function(err) { console.log(err); }
    // );
  } else if (session.message.text === "Transfer Money") {
    var result = moneyMover.accounts;
    var printObj = '';
    Object.keys(result).forEach(function(key) {
      printObj += (key + ": " + result[key] + "\n");
      printObj += (key + ": " + result[key] + "\n");
      printObj += (key + ": " + result[key] + "\n");
      printObj += ("-------------------------\n");
    });
    session.send(printObj);
  }else {
    session.send('You said ' + session.message.text);
  }
});