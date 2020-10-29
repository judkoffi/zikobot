import { Client } from 'discord.js';
import { Helper } from '../utils/helper';

export async function readyHandler(client: Client) {
  console.log(`Logged in as ${client?.user?.tag}!`);
  await client.user.setPresence({
    status: 'online',
    activity: { name: `Maintenance` }
  });
}