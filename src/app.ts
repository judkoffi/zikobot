import { Client } from 'discord.js';
import { config } from 'dotenv';
import { messageHandler } from './events/message';
import { readyHandler } from './events/ready';

config();

const client = new Client();

client.on('ready', async () => readyHandler(client));
client.on('message', async (message) => messageHandler(message, client));
client.on('error', async (error) => console.error(error));
client.login(process.env.BOT_TOKEN || process.exit(-1));