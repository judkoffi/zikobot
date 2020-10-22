import { ColorResolvable, EmbedFieldData, MessageEmbed } from 'discord.js';

export function getRandomColor(): ColorResolvable {
  return Math.floor(Math.random() * 16777215).toString(16);
}






export function getHelpMessage(): MessageEmbed {
  return new MessageEmbed()
    .setColor(getRandomColor())
    .attachFiles(['assets/vinyl.png'])
    .setThumbnail('attachment://vinyl.png')
    .setTitle('Commands')
    .addFields(Helper.FIELDS)
    .setTimestamp();
}

export class Helper {
  static PREFIX = '?';

  static FIELDS: EmbedFieldData[] = [
    { name: `${Helper.PREFIX}help`, value: 'Display help' },
    { name: `${Helper.PREFIX}queue {url}`, value: 'Add new video in playlist' },
    { name: `${Helper.PREFIX}play {url}`, value: 'Play music from given url' },
    { name: `${Helper.PREFIX}start`, value: 'Start playlist listening' },
    { name: `${Helper.PREFIX}show`, value: 'Show content of current playlist', inline: true },
    { name: `${Helper.PREFIX}stop`, value: 'Stop music and leave voice channel', inline: true },
    { name: `${Helper.PREFIX}next`, value: 'Play next song in playlist', inline: true },
    { name: `${Helper.PREFIX}pause`, value: 'Pause current playing music', inline: true },
    { name: `${Helper.PREFIX}resume`, value: 'Play paused music', inline: true },
    { name: `${Helper.PREFIX}search {title}`, value: 'Search video by title', inline: true }
  ];
}

export function makeMsgEmbed(title: string, description?: string, fields?: []) {
  const msg = new MessageEmbed()
    .setColor(getRandomColor())
    .attachFiles(['assets/vinyl.png'])
    .setThumbnail('attachment://vinyl.png')
    .setTitle(title)
    .setTimestamp();

  if (description) {
    msg.setDescription(description);
  }

  if (fields) {
    msg.addFields(fields)
  }
  return msg;
}