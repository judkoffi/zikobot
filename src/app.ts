import { Client } from 'discord.js';
import { config } from 'dotenv';
import { readyHandler } from './events/ready';
import { messageHandler } from './events/message';

config();

const client = new Client();
client.on('ready', async () => readyHandler(client));
client.on('message', async (message) => messageHandler(message, client));
client.on('error', async (error) => console.error(error));
client.login(process.env.BOT_TOKEN || process.exit(-1)) ;