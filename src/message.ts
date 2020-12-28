import { Message } from "discord.js";
import { parseCommand } from "./command/command";
import { GuildEntry } from "./model/entry";
import { Helper } from "./utils/helper";
import { CommandVisitor } from "./visitor/visitor";
import { VisitorHandler } from "./visitor/visitorHandler";

export async function messageHandler(message: Message, map: Map<string, GuildEntry>) {
  if (message.author.bot || message.channel.type !== "text")
    return;

  if (!message.content.startsWith(Helper.PREFIX))
    return;

  const args = message.content.slice(Helper.PREFIX.length).trim().split(/ +/g);
  const command = parseCommand(args, message, map);

  const visitor = new VisitorHandler();
  visitor.attach(command);
  visitor.operate(new CommandVisitor());
}
