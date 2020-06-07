import { Client, Message, VoiceChannel } from 'discord.js';
import { Queue } from 'typescript-collections';
import * as urlRegex from 'url-regex';
import * as ytdl from 'ytdl-core';
import { Entry } from '../model/entry';
import { Helper } from '../utils/helper';

const queue: Queue<Entry> = new Queue();

async function play(voiceChannel: VoiceChannel, message: Message, url: string): Promise<void> {
  if (!voiceChannel) {
    message.reply('please join a voice channel first!');
    return;
  }

  const connection = await voiceChannel.join();
  const stream = ytdl.default(url, { filter: 'audioonly' });
  const dispatcher = connection.play(stream);
  dispatcher.setVolumeLogarithmic(0.5);
  const info = await ytdl.getBasicInfo(url);
  const msg = Helper.makeMsgEmbed('Current playing');
  msg.setImage(info.videoDetails.embed.iframeUrl);
  msg.addField('title', info.videoDetails.title);
  message.reply(msg);
  dispatcher.on('finish', async () => await playFromQueue(voiceChannel, message));
}

async function playFromQueue(voiceChannel: VoiceChannel, message: Message): Promise<void> {
  if (!queue.peek()) {
    message.member?.voice.channel?.leave();
    return;
  }

  const entry = queue.dequeue();
  console.log(entry.getUrl());
  play(voiceChannel, message, entry.getUrl());
}

function queueCmdHandler(message: Message): void {
  const args = message.content.split(' ');
  if (args.length < 2) {
    const str = `${Helper.PREFIX}queue {video url}`;
    message.reply(Helper.makeMsgEmbed('usage', str));
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

async function showCmdHandler(message: Message) {
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

async function playCmdHandler(message: Message) {
  if (message.channel.type !== 'text')
    return;

  const args = message.content.split(' ');
  if (args.length < 2) {
    const str = `${Helper.PREFIX}play {video url}`;
    message.reply(Helper.makeMsgEmbed('usage', str));
    return;
  }

  const url = args[1];
  if (!urlRegex.default().test(url))
    return;

  let voiceChannel = message.member?.voice.channel;
  await play(voiceChannel, message, url);
}

export async function messageHandler(message: Message, client: Client) {

  if (message.content.startsWith('?help')) {
    message.reply(Helper.HELP_MSG);
  }

  if (message.content.startsWith('?queue')) {
    queueCmdHandler(message);
  }

  if (message.content.startsWith('?show')) {
    showCmdHandler(message);
  }

  if (message.content.startsWith('?stop')) {
    message.member?.voice.channel?.leave();
  }

  if (message.content.startsWith('?play')) {
    playCmdHandler(message);
  }

  if (message.content.startsWith('?playlist') || message.content.startsWith('?next')) {
    if (message.channel.type !== 'text')
      return;
    let voiceChannel = message.member?.voice.channel;
    await playFromQueue(voiceChannel, message);
  }

  if (message.content.startsWith('?pause')) {
    let voiceChannel = message.member?.voice?.channel;
    const connection = await voiceChannel?.join();
    connection?.dispatcher?.pause();
  }

  if (message.content.startsWith('?resume')) {
    let voiceChannel = message.member?.voice?.channel;
    const connection = await voiceChannel?.join();
    connection?.dispatcher?.resume();
  }
}