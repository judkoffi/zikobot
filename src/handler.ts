import { Message } from 'discord.js';
import yts from 'yt-search';
import ytdl from 'ytdl-core-discord';
import { GuildEntry as GuildEntry, VideoInfo as VideoInfo } from './model/entry';
import { Helper, makeMsgEmbed } from './utils/helper';



export async function playCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const query: string = extractQuery(message);
  if (!query) {
    const str = `${Helper.PREFIX}p text text text`;
    message.reply(makeMsgEmbed('usage', str));
    return;
  }

  const guildId = message.guild.id;

  if (!map.get(guildId)) {
    map.set(guildId, {
      voiceChannel: message.member?.voice?.channel,
      connection: null,
      volume: 5,
      playing: false,
      songs: [],
      textChannel: message.channel
    });
  }

  const value = map.get(guildId);

  const searchResult = await yts(query);
  const video = searchResult.videos.slice(0, 10).shift(); // take first result
  if (!video) {
    message.reply(makeMsgEmbed('', 'No result found'));
    return;
  }

  const song = new VideoInfo(video.url, message.author.username, video.title);
  value.connection = await message.member.voice.channel.join();
  map.set(guildId, value);

  if (!value.playing) {
    await play(message, song, map);
  } else {
    value.songs.push(song);
    console.log(value.songs);
  }

  message.react('✅');
}


async function play(message: Message, song: VideoInfo, map: Map<string, GuildEntry>): Promise<void> {
  const guildId = message.guild.id;
  const value: GuildEntry = map.get(guildId);

  const connection = value.connection;
  const stream = await ytdl(song.getUrl(), { filter: 'audioonly' });

  const playing = connection.play(stream, { type: 'opus' });
  value.playing = true;
  playing.on('finish', async () => {
    const nextSong = value.songs.shift();
    await play(message, nextSong, map);
  });

  playing.setVolumeLogarithmic(0.5);
  message.react('✅');
}


/**************** Helpers *****************/
function extractQuery(message: Message): string {
  const parameters: string[] = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  parameters.shift(); // remove command

  if (parameters.length < 2) {
    return null;
  }

  return parameters.reduce((p, c) => p + ' ' + c);
}
