import { MessageEmbed } from 'discord.js';

export class Helper {

  static RANDOM_COLOR = Math.floor(Math.random() * 16777215).toString(16);

  static HELP_MSG = new MessageEmbed()
    .setColor(Helper.RANDOM_COLOR)
    .attachFiles(['assets/vinyl.png'])
    .setThumbnail('attachment://vinyl.png')
    .setTitle('Commands')
    .addFields(
      { name: '?help', value: 'Display help' },
      { name: '?queue {url}', value: 'Add new video in playlist' },
      { name: '?play {url}', value: 'Play music from given url' },
      { name: '?playlist', value: 'Start playlist listening' },
      { name: '?show', value: 'Show content of current playlist', inline: true },
      { name: '?stop', value: 'Stop music and leave voice channel', inline: true },
      { name: '?next', value: 'Play next song in playlist', inline: true },
      { name: '?pause', value: 'Pause current playing music', inline: true },
      { name: '?resume', value: 'Play paused music', inline: true }
    )
    .setTimestamp();


  static makeMsgEmbed(title: string, description?: string, fields?: []) {
    const msg = new MessageEmbed()
      .setColor(Helper.RANDOM_COLOR)
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
}



