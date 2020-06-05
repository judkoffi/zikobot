import { Client, Message } from 'discord.js';
import { Queue } from 'typescript-collections';
import * as urlRegex from 'url-regex';
import { Entry } from '../model/entry';
import { Helper } from '../utils/helper';

const queue: Queue<Entry> = new Queue();

export function messageHandler(message: Message, client: Client) {

  if (message.content.startsWith('?help')) {
    message.reply(Helper.HELP_MSG);
  }


  if (message.content.startsWith('?queue')) {
    const args = message.content.split(' ');
    if (args.length < 2) {
      message.reply(Helper.makeMsgEmbed('usage', '```!queue {video url}```'));
      return;
    }

    const url = args[1];
    if (!urlRegex.default().test(url)) {
      message.reply(Helper.makeMsgEmbed('usage', '``` url invalid```'));
      return;
    }

    const result = queue.add(new Entry(url, message.author.tag));
    result ? message.reply('```added```') : message.reply('```no added```');
  }


  if (message.content.startsWith('?show')) {
    if (queue.isEmpty()) {
      message.reply(Helper.makeMsgEmbed('result', 'Playlist is empty'));
      return;
    }

    let msg = Helper.makeMsgEmbed('Playlist content', '');
    queue.forEach((entry) => {
      msg.addField(entry.getUrl(), 'by ' + entry.getAuthor());
    });
    message.reply(msg);
  }
}