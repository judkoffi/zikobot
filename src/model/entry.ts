import { Channel, VoiceChannel, VoiceConnection } from 'discord.js';
export class VideoInfo {
  private url: string;
  private title: string;

  private author: string;

  constructor(url: string, author: string, title: string) {
    this.url = url;
    this.author = author;
    this.title = title;
  }

  getUrl(): string {
    return this.url;
  }

  getAuthor(): string {
    return this.author;
  }
  getTitle(): string {
    return this.title;
  }
}


export interface GuildEntry {
  textChannel: Channel,
  voiceChannel: VoiceChannel,
  connection: VoiceConnection,
  songs: VideoInfo[],
  volume: 5,
  playing: boolean
}