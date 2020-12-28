import { Message } from "discord.js";
import { parseCommand } from "./model/command";
import { GuildEntry } from "./model/entry";
import { Helper } from "./utils/helper";
import { CommandVisitor, VisitorHandler } from "./visitor";

export async function messageHandler(message: Message, map: Map<string, GuildEntry>) {
  if (message.author.bot || message.channel.type !== "text")
    return;

  if (!message.content.startsWith(Helper.PREFIX))
    return;

  const args = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  const command = parseCommand(args, message, map);

  let visitor = new VisitorHandler();
  visitor.attach(command);
  visitor.operate(new CommandVisitor());
}
