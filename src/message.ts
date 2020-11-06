import { Message } from "discord.js";
import {
  nextCmdHandler,
  playCmdHandler,
  showCmdHandler,
  stopCmdHandler
} from "./handler";
import { GuildEntry } from "./model/entry";
import { getHelpMessage, Helper } from "./utils/helper";

export async function messageHandler(
  message: Message,
  map: Map<string, GuildEntry>
) {
  if (message.author.bot || message.channel.type !== "text") return;

  if (!message.content.startsWith(Helper.PREFIX)) return;

  const args = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  /*
   static FIELDS: EmbedFieldData[] = [
    { name: `${Helper.PREFIX}h`, value: 'Display help' },
    { name: `${Helper.PREFIX}p text text text`, value: 'Play music from given information' },
    { name: `${Helper.PREFIX}n`, value: 'Play next song in queue' },
    { name: `${Helper.PREFIX}queue text text text`, value: 'Add new video in playlist' },
    { name: `${Helper.PREFIX}show`, value: 'Show content of current playlist', inline: true },
    { name: `${Helper.PREFIX}bye`, value: 'Stop music and leave voice channel', inline: true },
  ];*/

  switch (command) {
    case "h": {
      message.reply(getHelpMessage());
      break;
    }

    case "p": {
      playCmdHandler(message, map);
      break;
    }

    case "n": {
      nextCmdHandler(message, map);
      break;
    }
    case "show": {
      showCmdHandler(message, map);
      break;
    }

    case "bye": {
      stopCmdHandler(message, map);
      break;
    }

    default: {
      break;
    }
  }
}
