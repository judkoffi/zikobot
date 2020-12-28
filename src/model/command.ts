import { Message } from "discord.js";
import { ICommand, IVisitor } from "../visitor";
import { GuildEntry } from "./entry";

export class HelpCommand implements ICommand {
  private message: Message;

  constructor(message: Message) {
    this.message = message;
  }

  public operate(visitor: IVisitor): void {
    visitor.visitHelp(this);
  }

  getMessage(): Message {
    return this.message;
  }
}

export class ShowCommand implements ICommand {
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
    visitor.visitShowCommand(this);
  }
}

export class ByeCommand implements ICommand {
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
    visitor.visitByeCommand(this);
  }
}

export class PauseCommand implements ICommand {
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
    visitor.visitPauseCommand(this);
  }
}


export class PlayCommand implements ICommand {
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
    visitor.visitPlayCommand(this);
  }
}


export class NextCommand implements ICommand {
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
    visitor.visitNextCommand(this);
  }
}

export class ResumeCommand implements ICommand {
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
    visitor.visitResumeCommand(this);
  }
}


export function parseCommand(args: string[], message: Message, map: Map<string, GuildEntry>): ICommand {
  let cmd = args.shift().toLowerCase();
  switch (cmd) {
    case "h": {
      return new HelpCommand(message);
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

    default: {
      break;
    }
  }
}