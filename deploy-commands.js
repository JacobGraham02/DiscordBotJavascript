/** The following are discord.js and discord api specific modules. 
 *	@discord .js/builders imports all of the builder patterns you can use when constructing various commands for the bot.
 * 	@discordjs /rest allows you to interact with the discord api and make REST requests. A REST API allows you to request data from an API over an HTTP connection.
 * 	discord-api-types /v9 includes the discord API that uses types (typescript). 
 **/
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const {discord_bot_token, discord_client_id, discord_guild_id} = require('./config.json');

// SlashCommandBuilder() can be compared similarly to the builder design pattern. 
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(discord_bot_token);

/**
 * Place the argument data inside of the REST request. The .then() and .catch() syntax signifies that this is an asynchronous operation. 
 */
rest.put(Routes.applicationGuildCommands(discord_client_id, discord_guild_id), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
