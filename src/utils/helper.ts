import { MessageEmbed } from 'discord.js';

export class Helper {

  static RANDOM_COLOR = Math.floor(Math.random() * 16777215).toString(16);

  static HELP_MSG = new MessageEmbed()
    .setColor(Helper.RANDOM_COLOR)
    .attachFiles(['assets/vinyl.png'])
    .setThumbnail('attachment://vinyl.png')
    .setTitle('Commands')
    .addFields()
    .setTimestamp();
}



