import { Client } from 'discord.js';
import { config } from 'dotenv';
import { messageHandler } from './message';
import { MapEntry } from './model/entry';
import { readyHandler } from './ready';

config();

const client = new Client();
const map: Map<String, any> = new Map<String, MapEntry>();

client.on('ready', async () => readyHandler(client));
client.on('message', async (message) => messageHandler(message, map));
client.on('error', async (error) => console.error(error));
client.login(process.env.BOT_TOKEN || process.exit(-1));