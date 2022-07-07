const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const {discord_bot_token, discord_client_id, discord_guild_id} = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(discord_bot_token);

rest.put(Routes.applicationGuildCommands(discord_client_id, discord_guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
