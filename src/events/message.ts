import { Client, Message, MessageEmbed } from 'discord.js';
import { Helper } from '../utils/helper';
export function messageHandler(message: Message, client: Client) {

  if (message.content.startsWith('?help')) {
    return message.reply(Helper.HELP_MSG);
  }

}