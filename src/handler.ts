import { Message } from "discord.js";
import fs from 'fs';
import util from 'util';
import yts from "yt-search";
import ytdl from "ytdl-core-discord";
import { GuildEntry, VideoInfo } from "./model/entry";
import { Helper, makeMsgEmbed } from "./utils/helper";

async function initCurrentGuildInfos(message: Message, map: Map<string, GuildEntry>) {
  if (!message.member?.voice?.channel) {
    message.reply("Please join a voice channel first!");
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
      textChannel: message.channel,
    });
  }
}

export async function playCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const query: string = extractQuery(message);
  if (!query) {
    const str = `${Helper.PREFIX}p text text text`;
    message.reply(makeMsgEmbed("usage", str));
    message.react("🚨");
    return;
  }

  await initCurrentGuildInfos(message, map);
  const guildId = message.guild.id;
  const value = map.get(guildId);

  const searchResult = await yts(query);
  const video = searchResult.videos.slice(0, 10).shift(); // take first result
  if (!video) {
    message.reply(makeMsgEmbed("", "No result found"));
    return;
  }

  const song = new VideoInfo(video.url, message.author.username, video.title);
  value.connection = await message.member?.voice?.channel?.join();
  map.set(guildId, value);

  if (!value.playing) {
    await play(message, song, map);
  } else {
    value.songs.push(song);
  }

  message.react("✅");
}

export async function showCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const value = map.get(message.guild.id);
  if (!value || value.songs.length === 0) {
    message.reply(makeMsgEmbed("result", "Playlist is empty"));
    return;
  }

  const text = value.songs
    .map((e) => `${e.getTitle()} [${e.getAuthor()}]\n`)
    .reduce((acc, v) => acc + v);

  const msg = "```" + text + "```";
  message.reply(msg);
}

export async function nextCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const value = map.get(message.guild.id);
  if (!value || value.songs.length === 0) {
    message.react("❌");
    return;
  }

  const nextSong = value.songs.shift();
  await play(message, nextSong, map);
  message.react("✅");
}

export function pauseCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const value = map.get(message.guild.id);
  if (!value) {
    message.react("❌");
    return;
  }

  value.connection?.dispatcher?.pause();
  message.react("✅");
}

export function resumeCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const value = map.get(message.guild.id);
  if (!value) {
    message.react("❌");
    return;
  }

  value.connection?.dispatcher?.resume();
  message.react("✅");
}

export async function stopCmdHandler(message: Message, map: Map<string, GuildEntry>) {
  const value = map.get(message.guild.id);
  if (!value) {
    message.react("❌");
    return;
  }

  value.voiceChannel.leave();
  map.delete(message.guild.id);
  message.react("🖖");
}

async function play(message: Message, song: VideoInfo, map: Map<string, GuildEntry>): Promise<void> {
  const guildId = message.guild.id;
  const value: GuildEntry = map.get(guildId);

  const connection = value.connection;
  try {
    console.log(song.getUrl());
    const stream = await ytdl(song.getUrl(), { filter: "audioonly" });

    const playing = connection.play(stream, { type: "opus" });
    value.playing = true;
    playing.on("finish", async () => {
      if (value.songs.length === 0) {
        value.playing = false;
        return;
      }
      const nextSong = value.songs.shift();
      await play(message, nextSong, map);
    });

    playing.setVolumeLogarithmic(0.5);
  } catch (e) {
    console.error(e.message);
    message.react("❌");
  }
}

export async function listPlaylistHandler(message: Message, map: Map<string, GuildEntry>): Promise<void> {
  try {
    const exec = util.promisify(require('child_process').exec);
    const { stdout, stderr } = await exec(`ls ${Helper.PLAYLIST_FOLDER}`);
    const tokens: string[] = stdout.split('\n').filter((e: string) => e !== '');
    const text = tokens.reduce((acc, v) => acc + '; ' + v);
    const msg = "```" + text + "```";
    message.reply(msg);
  } catch (e) {
    console.error(e.message);
    message.react("❌");
  }
}

export async function loadPlaylistHandler(message: Message, map: Map<string, GuildEntry>): Promise<void> {
  try {
    await initCurrentGuildInfos(message, map);

    const guildId = message.guild.id;
    const filename: string = `${Helper.PLAYLIST_FOLDER}/${extractQuery(message)}`;
    const data: string = fs.readFileSync(filename, { encoding: 'utf-8' });
    const lines = data.split(/\r?\n/);

    const value = map.get(guildId);

    lines.forEach(async (line) => {
      if (line !== '') {
        const searchResult = await yts(line);
        const video = searchResult.videos.slice(0, 10).shift(); // take first result
        if (video) {
          const song = new VideoInfo(video.url, message.author.username, video.title);
          value.songs.push(song);
        }
      }
    });

    if (!value.playing) {
      value.connection = await message.member?.voice?.channel?.join();
      await play(message, value.songs.shift(), map);
    }
    message.react("✅");
  } catch (e) {
    console.error(e.message);
    message.react("❌");
  }
}

/**************** Helpers *****************/
function extractQuery(message: Message): string {
  const parameters: string[] = message.content
    .slice(Helper.PREFIX.length)
    .trim()
    .split(/ +/g);
  parameters.shift(); // remove command

  if (parameters.length < 1) {
    return null;
  }

  return parameters.reduce((p, c) => p + " " + c);
}
