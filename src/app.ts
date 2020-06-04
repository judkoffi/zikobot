import { Client } from 'discord.js';
import { config } from 'dotenv';
import { readyHandler } from './events/ready';
import { messageHandler } from './events/message';

config();
const client = new Client();

client.on('ready', () => readyHandler(client));

client.on('message', (message) => messageHandler(message, client));
client.login(process.env.BOT_TOKEN);
