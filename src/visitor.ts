import { Message } from "discord.js";
import { nextCmdHandler, pauseCmdHandler, playCmdHandler, resumeCmdHandler, showCmdHandler, stopCmdHandler } from "./handler";
import { ByeCommand, HelpCommand, NextCommand, PauseCommand, PlayCommand, ResumeCommand, ShowCommand } from "./model/command";
import { getHelpMessage } from "./utils/helper";

export interface IVisitor {
  visitHelp(cmd: HelpCommand): void;
  visitShowCommand(cmd: ShowCommand): void;
  visitByeCommand(cmd: ByeCommand): void;
  visitPauseCommand(cmd: PauseCommand): void;
  visitPlayCommand(cmd: PlayCommand): void;
  visitNextCommand(cmd: NextCommand): void;
  visitResumeCommand(cmd: ResumeCommand): void;
}

export interface ICommand {
  operate(visitor: IVisitor): void;
  getMessage(): Message;
}


export class CommandVisitor implements IVisitor {
  public async visitPlayCommand(cmd: PlayCommand): Promise<void> {
    await playCmdHandler(cmd.getMessage(), cmd.getMap());
  }

  public async visitNextCommand(cmd: NextCommand): Promise<void> {
    await nextCmdHandler(cmd.getMessage(), cmd.getMap());
  }

  public async visitResumeCommand(cmd: ResumeCommand): Promise<void> {
    await resumeCmdHandler(cmd.getMessage(), cmd.getMap());
  }

  public async visitHelp(cmd: HelpCommand): Promise<void> {
    await cmd.getMessage().reply(getHelpMessage());
  }

  public async visitShowCommand(cmd: ShowCommand): Promise<void> {
    await showCmdHandler(cmd.getMessage(), cmd.getMap());
  }


  public async visitByeCommand(cmd: ByeCommand): Promise<void> {
    await stopCmdHandler(cmd.getMessage(), cmd.getMap());
  }

  public async visitPauseCommand(cmd: PauseCommand): Promise<void> {
    await pauseCmdHandler(cmd.getMessage(), cmd.getMap());
  }
}


export class VisitorHandler {
  private elements: ICommand[] = [];

  public attach(e: ICommand): void {
    this.elements.push(e);
  }

  public detach(e: ICommand): void {
    var index = this.elements.indexOf(e);
    if (!index) return;
    this.elements.splice(index, 1);
  }

  public operate(visitor: IVisitor): void {
    const max = this.elements.length;
    for (let i = 0; i < max; i += 1) {
      let elt = this.elements[i];
      if (!elt) return;
      elt.operate(visitor);
    }
  }
}
