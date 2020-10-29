import { Client, Message } from 'discord.js';
import { Queue } from 'typescript-collections';
import { VideoEntry } from '../model/entry';
import { getHelpMessage, Helper } from '../utils/helper';
import { playCmdHandler } from './handler';

const queue: Queue<VideoEntry> = new Queue();

export async function messageHandler(message: Message, client: Client) {
  if (message.channel.type !== 'text')
    return;

  const args = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  /*
   static FIELDS: EmbedFieldData[] = [
    { name: `${Helper.PREFIX}h`, value: 'Display help' },
    { name: `${Helper.PREFIX}p text text text`, value: 'Play music from given information' },
    { name: `${Helper.PREFIX}n`, value: 'Play next song in queue' },
    { name: `${Helper.PREFIX}queue text text text`, value: 'Add new video in playlist' },
    { name: `${Helper.PREFIX}show`, value: 'Show content of current playlist', inline: true },
    { name: `${Helper.PREFIX}bye`, value: 'Stop music and leave voice channel', inline: true },
  ];*/

  switch (command) {
    case 'h': {
      message.reply(getHelpMessage());
      break;
    }

    case 'p': {
      playCmdHandler(message, queue);
      break;
    }

    default: {
      break;
    }
  }
}

