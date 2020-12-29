import { ColorResolvable, EmbedFieldData, MessageEmbed } from "discord.js";

export function getRandomColor(): ColorResolvable {
  return Math.floor(Math.random() * 16777215).toString(16);
}

export function getHelpMessage(): MessageEmbed {
  return new MessageEmbed()
    .setColor(getRandomColor())
    .attachFiles(["assets/vinyl.png"])
    .setThumbnail("attachment://vinyl.png")
    .setTitle("Commands")
    .addFields(Helper.FIELDS)
    .setTimestamp();
}

export class Helper {
  static PREFIX = "?";

  static PLAYLIST_FOLDER = "users_playslists";

  static FIELDS: EmbedFieldData[] = [
    { name: `${Helper.PREFIX}h or ${Helper.PREFIX}help`, value: "Display help" },
    {
      name: `${Helper.PREFIX}p text text text`,
      value: "Play music from given information",
    },
    {
      name: `${Helper.PREFIX}n`,
      value: "Play next song in queue"
    },
    {
      name: `${Helper.PREFIX}pause`,
      value: "Pause current music"
    },
    {
      name: `${Helper.PREFIX}resume`,
      value: `Re-play after ${Helper.PREFIX}pause command `
    },
    {
      name: `${Helper.PREFIX}playlists`,
      value: `List saved playlists `
    },
    {
      name: `${Helper.PREFIX}load {playlist name}`,
      value: `play selected playlist `
    },
    {
      name: `${Helper.PREFIX}show`,
      value: "Show content of current playlist",
      inline: true,
    },
    {
      name: `${Helper.PREFIX}bye`,
      value: "Stop music and leave voice channel",
      inline: true,
    },
  ];
}

export function makeMsgEmbed(title: string, description?: string, fields?: []) {
  const msg = new MessageEmbed()
    .setColor(getRandomColor())
    .attachFiles(["assets/vinyl.png"])
    .setThumbnail("attachment://vinyl.png")
    .setTitle(title)
    .setTimestamp();

  if (description) {
    msg.setDescription(description);
  }

  if (fields) {
    msg.addFields(fields);
  }
  return msg;
}
