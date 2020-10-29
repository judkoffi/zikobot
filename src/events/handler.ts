import { Mutex } from 'async-mutex';
import { Message, VoiceChannel } from 'discord.js';
import { Queue } from 'typescript-collections';
import yts from 'yt-search';
import ytdl from 'ytdl-core-discord';
import { VideoEntry } from '../model/entry';
import { Helper, makeMsgEmbed } from '../utils/helper';

const mutex = new Mutex();

export async function playFromQueue(voiceChannel: VoiceChannel, message: Message, queue: Queue<VideoEntry>): Promise<void> {
  let targetUrl: VideoEntry = null;

  const release = await mutex.acquire();
  try {
    if (!queue.peek()) {
      message.member?.voice.channel?.leave();
      return;
    }

    targetUrl = queue.dequeue();
  } finally {
    release();
  }

  play(voiceChannel, message, targetUrl.getUrl(), queue);
}


export async function playCmdHandler(message: Message, queue: Queue<VideoEntry>) {
  let parameters: string[] = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  parameters.shift(); // remove command

  if (parameters.length < 2) {
    const str = `${Helper.PREFIX}p text text text`;
    message.reply(makeMsgEmbed('usage', str));
    return;
  }

  let query: string = parameters.reduce((p, c) => p + ' ' + c);
  const searchResult = await yts(query);
  const video = searchResult.videos.slice(0, 10).shift(); // take first result
  const voiceChannel = message.member?.voice.channel;
  await play(voiceChannel, message, video.url, queue);

  message.react('✅');
}


export async function play(voiceChannel: VoiceChannel, message: Message, url: string, queue: Queue<VideoEntry>): Promise<void> {
  if (!voiceChannel) {
    message.reply('Please join a voice channel first!');
    return;
  }

  const connection = await voiceChannel.join();
  let stream = await ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });

  let playing = connection.play(stream, { type: 'opus' });

  playing.on('finish', async () => await playFromQueue(voiceChannel, message, queue));
  playing.setVolumeLogarithmic(0.5);

  message.react('✅');
}

