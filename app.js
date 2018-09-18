var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
require('dotenv').config();

var { creditOffers } = require('./api_calls/credit_offers.js');
var { rewards } = require('../api_calls/rewards.js');

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

// Setup LUIS
var luisAppId = process.env.LUIS_APP_ID;
var luisAppKey = process.env.LUIS_APP_KEY;
var luisAppHostName = process.env.LUIS_APP_HOSTNAME;

var luisModelUrl = 'https://' + luisAppHostName + '/luis/v2.0/apps/' + luisAppId + '?subscription-key=' + luisAppKey;

// Create a recognizer for retrieving intents from LUIS
var recognizer = new builder.LuisRecognizer(luisModelUrl);
bot.recognizer(recognizer);

// Add intent dialog
bot.dialog('GreetingDialog',
  (session) => {
    session.send('Hi! Cohabicount here!');
    session.endDialog();
  }
).triggerAction({ matches: 'Greeting' });

bot.dialog('InfoDialog',
  (session, args) => {
    session.send("Loading " + args.intent.entities[0].type + " ...");
    switch (args.intent.entities[0].type) {
      case "Credit Offers":
        session.send(creditOffers);
        break;
      case "Rewards":
        session.send(rewards);
        break;
      default:
        session.send('Information not found.');
    }
    session.endDialog();
  }).triggerAction({ matches: 'getInfo' });