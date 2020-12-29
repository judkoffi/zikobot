
import { Message } from "discord.js";
import { GuildEntry } from "../model/entry";
import { IVisitor } from "../visitor/visitor";
import { ICommand } from "./command";

export class LoadPlaylistCommand implements ICommand {
  private message: Message;
  private map: Map<string, GuildEntry>;

  constructor(message: Message, map: Map<string, GuildEntry>) {
    this.message = message;
    this.map = map;
  }

  getMessage(): Message {
    return this.message;
  }

  getMap(): Map<string, GuildEntry> {
    return this.map;
  }

  public operate(visitor: IVisitor): void {
    visitor.visitLoadPlaylistCommand(this);
  }
}