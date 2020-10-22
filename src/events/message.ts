import { Client, Message } from 'discord.js';
import { Queue } from 'typescript-collections';
import { Entry } from '../model/entry';
import { getHelpMessage, Helper } from '../utils/helper';
import { playCmdHandler, playFromQueue, queueCmdHandler, searchCmdHandler, showCmdHandler, queueFromCmdHandler } from './handler';

let queue: Queue<Entry> = new Queue();

export async function messageHandler(message: Message, client: Client) {
  if (message.channel.type !== 'text')
    return;

  const args = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  switch (command) {
    case 'help': {
      message.reply(getHelpMessage());
      break;
    }

    case 'queue': {
      queueCmdHandler(message, queue);
      break;
    }

    case 'queuefrom': {
      queueFromCmdHandler(message, queue);
      break;
    }

    case 'show': {
      showCmdHandler(message, queue);
      break;
    }

    case 'stop': {
      message?.member?.voice?.channel?.leave();
      message.react('🖖');
      break;
    }

    case 'play': {
      playCmdHandler(message, queue);
      break;
    }

    case 'start': {
      const voiceChannel = message.member?.voice.channel;
      await playFromQueue(voiceChannel, message, queue);
      break;
    }

    case 'next': {
      const voiceChannel = message.member?.voice.channel;
      await playFromQueue(voiceChannel, message, queue);
      break;
    }

    case 'pause': {
      const voiceChannel = message.member?.voice?.channel;
      const connection = await voiceChannel?.join();
      connection?.dispatcher?.pause();
      break;
    }

    case 'resume': {
      const voiceChannel = message.member?.voice?.channel;
      const connection = await voiceChannel?.join();
      connection?.dispatcher?.resume();
      break;
    }

    case 'search': {
      searchCmdHandler(message);
      break;
    }

    default: {
      break;
    }
  }
}

