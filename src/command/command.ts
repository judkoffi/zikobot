import { Message } from "discord.js";
import { GuildEntry } from "../model/entry";
import { IVisitor } from "../visitor/visitor";
import { ByeCommand } from "./byeCommand";
import { HelpCommand } from "./helpCommand";
import { ListPlaylistCommand } from "./listPlaylistCommand";
import { LoadPlaylistCommand } from "./loadPlaylistCommand";
import { NextCommand } from "./nextCommand";
import { PauseCommand } from "./pauseCommand";
import { PlayCommand } from "./playCommand";
import { ResumeCommand } from "./resumeCommand";
import { ShowCommand } from "./showCommand";

export interface ICommand {
  operate(visitor: IVisitor): void;
}


export function parseCommand(args: string[], message: Message, map: Map<string, GuildEntry>): ICommand {
  const cmd = args.shift().toLowerCase();
  switch (cmd) {
    case "h":
    case "help": {
      return new HelpCommand(message, map);
    }

    case "show": {
      return new ShowCommand(message, map);
    }

    case "bye": {
      return new ByeCommand(message, map);
    }

    case "pause": {
      return new PauseCommand(message, map);
    }

    case "p": {
      return new PlayCommand(message, map);
    }

    case "resume": {
      return new ResumeCommand(message, map);
    }

    case "n": {
      return new NextCommand(message, map);
    }

    case "playlists": {
      return new ListPlaylistCommand(message, map);
    }

    case "load": {
      return new LoadPlaylistCommand(message, map);
    }

    default: {
      break;
    }
  }
}