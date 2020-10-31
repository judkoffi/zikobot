import { Channel, VoiceChannel } from 'discord.js';
export class VideoEntry {
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


export interface MapEntry {
  textChannel: Channel,
  voiceChannel: VoiceChannel,
  connection: null,
  songs: [],
  volume: 5,
  playing: true
}