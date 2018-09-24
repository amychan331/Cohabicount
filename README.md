# Cohabicount
Team members: Amy Chan, Adam Tropp, Candida Haynes
Entry for: [2018 Capital One DevExchange](https://www.eventbrite.com/e/capital-one-devexchange-series-san-francisco-tickets-43866338399)
Awarded for: Microsoft's Cortana Sponsor Prize
<kbd>![Cohabicount in Slack](https://github.com/amychan331/Cohabicount/blob/master/statics/images/Cohabicount_Demo.gif)</kbd>

## Inspiration
In a metropolitan like San Francisco, people are increasingly live and work in shared spaces. In particular, our team mate Candida lived in an extremely large cohousing where financial communication can be difficult and messy but essential because they share a bank account. Like many household, they used a messenger - Slack in their case. We wanted to build a messenger-based tool that will utilize Capital One API to improve financial-related communication and management of bank accounts in a shared household or work environment.

## Description
Cohabicount is an platform-agnostic chatbot that detects when user users have bank or account related questions or request - such as rewards or points earned, suitable credit offers, or sign up request - then offer the relevant datas or assistance so household members can easily discuss their options or take actions.

## Technology
Cohabicount is built using Azure Bot Framework in a Node.js environment. Using Azure's Cognitive Services, LUIS (Language Understanding Intelligent Service), the bot detects phrases related to bank or account question/requests. Relevant data are then extracted from Capital One's Rest API in JSON format, processed in readable phrases, and output to user.
For the hackathon demo, we also connected the bot to Slack:

## Hackathon Progress & Roles
The team used the first night to brainstorm and set up our target result goals for the hackathon. We asked about the current industry concerns and technological capabilities with mentors from Capital One and Microsoft. Using Microsoft Bot Framework and the Azure platform, we were able to built a chatbot and install it in Slack. JSON files are created from Capital One API and connected to the chatbot.

## Challenges
We were initially unsure of what each of the Capital One API can do, so we asked the mentors a lot questions and experimenting took a lot of time. Microsoft's Azure platform also had a lot of services, so we weren't sure which one to use at first. When we did built the bot, we had difficulty connecting to Slack, but we were able found out why  with the help from the Microsoft's mentors. Though a LUIS service was set up for the bot, we weren't able to train and utilize it in time for the demo.

## Current Progress
The LUIS service have been trained and implemented into the bot. Directories are reorganized. The JS files that made the API called had been cleaned up, and both files and directories are re-organized.

## To-Do
Add more Capital One services but creating more API calls.

# Getting started
There are 3 services that you will be utilizing: Capital One API, Microsoft's Azure platform, Microsoft's LUIS platform. Optionally, you may also use [Botframework Emulator](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-debug-emulator?view=azure-bot-service-4.0) for local testing, but I wouldn't go into that here.
### Local Setup & Azure
1. Sign up or login at [Microsoft Azure](https://azure.microsoft.com/en-us/).
2. Follow the doc instruction on [Create a new bot service](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-quickstart?view=azure-bot-service-4.0#create-a-new-bot-service-1)
3. In the **Bot Management** section, click **Build**. On the right side, click **Download zip file**. Download and extract the directory.
4. Clone this repository
```
git clone https://github.com/amychan331/Cohabicount.git
cd Cohabicount
```
5. Move the directories and files of **api_calls, statics, .gitignore, app.js, package.json** from the cloned repo to the directory downloaded from Azure bot in Step 3. Allow overwrite of any duplicates.
6. Deleted the cloned repo.
6. cd into the Azure bot code directory. NPM install needed node_modules

### Capital One
1. Go [Capital One's developer site](https://developer.capitalone.com/)
2. To use Capital One API, access token is needed. For testing purpose, go to [Capital One's API](https://developer.capitalone.com/products) page and click on an API that you are interested in. Go to **Playground**.
3. Click the **Send** button to get an temporary playground access token. Make sure to copy it down.
4. Sign into Azure portal and select your Web Bot. Go to **Application Settings**
5. In the **App Settings* panel at the right, add a new key named **ACCESS_TOKEN**. In the corresponding value, add the access token you got from the playground earlier.

### LUIS
1. A LUIS bot have to created separately and connect to your web bot. Start by logging in the (LUIS portal)[http://www.luis.ai].
2. Go to **My Apps**, select **Create new app**.
3. Name your application Cohabicount or Cohabicount LUIS. Language should be English by default. Click **Done**.
4. Under **App Assets**, select **Intents**. At the right panel, click **+ Create new intent**.
5. For the **Intent name**, enter **getInfo**.
6. Under **App Assets**, select **Entities**. At the right panel, click **+ Create new entity**.
7. For the **Entity name**, enter the Capital One API you are interested in. For now, the options are **Credit Offers** or **Rewards**. **Entity type** should remain **Simple** by default.
8. Go back to **getInfo** in **Intents**.
9. Read (Build custom app to determine user intentions)[] to learn and start training your LUIS app.
10. When finish training, select the top tab **Manage**.
11. In the left sidebar, select **Application Information**. In the right panel, look for **Application ID**. Copy that down.
12. In the left sidebar, select **Keys and Endpoints**. In the right panel, look for **Authoring Key**. Copy that down. In the table below, there should be endpoint URL. Copy down the part of url that look like this: some-region.api.cognitive.microsoft.com. That is your region value for key LUIS_APP_HOSTNAME later.
13. To connect the LUIS app to the web bot, go back to the [Azure portal](https://portal.azure.com/) and select your web bot.
14. Go to **Application Settings** and add in keys: LUIS_APP_ID, LUIS_APP_KEY, LUIS_APP_HOSTNAME.

### Deployment
Publish the new files to Azure platform
```
npm install -g azure-publish
npm run azure-publish
```
Using Azure's channel, the bot can be installed in various communication apps like Slack. Go to [Connect a bot to channels](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-manage-channels?view=azure-bot-service-4.0) for more information.