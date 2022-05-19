require('dotenv').config();
// This would roughly translate into this: const Client = require('discord.js').Client; const Intents = require('discord.js').Intents;
const { Client, Intents } = require('discord.js');
const discord_bot_token_id = process.env.DISCORD_BOT_TOKEN_ID;
const client_instance = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MongoClient, ServerApiVersion } = require('mongodb');
const database_url = process.env.MONGODB_CONNECTION_STRING;
const mongodb_client = new MongoClient(database_url, { useNewUrlParser: true, serverApi: ServerApiVersion.v1 });
const database_name = "DiscordBot";
const collection_name = "Work";

client_instance.once('ready', function() {
    console.log('The client instance is ready for use.');
});

async function connectToCluster() {
    try {
        await mongodb_client.connect();
    } catch (connection_error) {
        console.error("Error connecting to the mongodb database", connection_error);
    }
}

async function connectToClusterCollection() {
    const database = mongodb_client.db(database_name);
    const collection = database.collection(collection_name);
}

async function disconnectFromCluster() {
    try {
        await mongodb_client.close();
    } catch (disconnection_error) {
        console.error("Error disconnecting from the mongodb database", disconnection_error);
    }
}


client_instance.login(discord_bot_token_id);