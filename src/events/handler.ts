
import { Message, VoiceChannel } from 'discord.js';
import { Queue } from 'typescript-collections';
import * as urlRegex from 'url-regex';
import yts from 'yt-search';
import * as ytdl from 'ytdl-core';
import { Entry } from '../model/entry';
import { Helper, makeMsgEmbed } from '../utils/helper';

export async function searchCmdHandler(message: Message) {
  const args = message.content.split(' ');
  if (args.length < 2) {
    const str = `${Helper.PREFIX}search text text text .... text`;
    message.reply(makeMsgEmbed('usage', str));
    message.react('🚨');
    return;
  }

  const title = args.slice(1, args.length).join(" ");
  const searchResult = await yts(title);
  const videos = searchResult.videos.slice(0, 5); // keep 5 first links
  const msg = makeMsgEmbed('Search result', '');
  videos.forEach((v) => {
    msg.addField(`${v.title} by ${v.author.name}`, `${v.url}`);
  });
  message.react('✅');
  message.reply(msg);
}

export async function play(voiceChannel: VoiceChannel, message: Message, url: string, queue: Queue<Entry>): Promise<void> {
  if (!voiceChannel) {
    message.reply('Please join a voice channel first!');
    return;
  }

  const connection = await voiceChannel.join();
  const stream = ytdl.default(url, { filter: 'audioonly', });
  const dispatcher = connection.play(stream);
  dispatcher.setVolumeLogarithmic(0.5);
  const info = await ytdl.getBasicInfo(url);
  const msg = makeMsgEmbed('Current playing');
  msg.setImage(info.videoDetails.embed.iframeUrl);
  msg.addField('title', info.videoDetails.title);
  message.react('✅');
  message.reply(msg);
  dispatcher.on('finish', async () => await playFromQueue(voiceChannel, message, queue));
}

export async function playFromQueue(voiceChannel: VoiceChannel, message: Message, queue: Queue<Entry>): Promise<void> {
  if (!queue.peek()) {
    message.member?.voice.channel?.leave();
    return;
  }

  const entry = queue.dequeue();
  play(voiceChannel, message, entry.getUrl(), queue);
}

export function queueCmdHandler(message: Message, queue: Queue<Entry>): void {
  const args = message.content.split(' ');
  if (args.length < 2) {
    const str = `${Helper.PREFIX}queue {video url}`;
    message.reply(makeMsgEmbed('usage', str));
    return;
  }

  const url = args[1];
  if (!urlRegex.default().test(url)) {
    message.reply(makeMsgEmbed('usage', '``` url invalid```'));
    return;
  }
  const result = queue.add(new Entry(url, message.author.tag));
  result ? message.react('✅') : message.react('❎');
}

export function queueFromCmdHandler(message: Message, queue: Queue<Entry>): void {
  const args = message.content.split(' ');
  if (args.length < 2) {
    const str = `${Helper.PREFIX}queuefrom video url1, video url2, ..., video url 3`;
    message.reply(makeMsgEmbed('usage', str));
    return;
  }

  let success: boolean = true;

  for (let i = 2; i < args.length; i++) {
    const url = args[i].split(',')[0];
    if (urlRegex.default().test(url)) {
      success &&= queue.add(new Entry(url, message.author.tag));
    }
  }
  success ? message.react('✅') : message.react('❎');
}


export function showCmdHandler(message: Message, queue: Queue<Entry>) {
  if (queue.isEmpty()) {
    message.reply(makeMsgEmbed('result', 'Playlist is empty'));
    return;
  }

  const msg = makeMsgEmbed('Playlist content', '');
  queue.forEach((entry) => {
    msg.addField(entry.getUrl(), 'by ' + entry.getAuthor());
  });
  message.reply(msg);
}

export async function playCmdHandler(message: Message, queue: Queue<Entry>) {
  const args = message.content.split(' ');
  if (args.length < 2) {
    const str = `${Helper.PREFIX}play {video url}`;
    message.reply(makeMsgEmbed('usage', str));
    return;
  }

  const url = args[1];
  if (!urlRegex.default().test(url))
    return;

  const voiceChannel = message.member?.voice.channel;
  await play(voiceChannel, message, url, queue);
}
