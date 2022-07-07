require('dotenv').config();

// This would roughly translate into this: const Client = require('discord.js').Client; const Intents = require('discord.js').Intents;
const { Client, Intents } = require('discord.js');

const { discord_bot_token, discord_client_id, discord_guild_id } = require('./config.json');

const client_instance = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MongoClient, ServerApiVersion } = require('mongodb');
const database_url = process.env.MONGODB_CONNECTION_STRING;
const mongodb_client = new MongoClient(database_url, { useNewUrlParser: true, serverApi: ServerApiVersion.v1 });
const database_name = "DiscordBot";
const collection_name = "Work";

client_instance.once('ready', () => {
    console.log("Ready");
});

client_instance.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client_instance.login(discord_bot_token);

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

async function createWorkDocumentForMongodb(collection_name) {
    const workDocument = {
        course_code: "Test",
        course_work_name: "Test course work name",
        course_work_due_date: "Test course work due date",
        course_work_input_date: "05-24-2022" 
    }
}

async function disconnectFromCluster() {
    try {
        await mongodb_client.close();
    } catch (disconnection_error) {
        console.error("Error disconnecting from the mongodb database", disconnection_error);
    }
}


client_instance.login(discord_bot_token);