import { ByeCommand } from "../command/byeCommand";
import { HelpCommand } from "../command/helpCommand";
import { ListPlaylistCommand } from "../command/listPlaylistCommand";
import { LoadPlaylistCommand } from "../command/loadPlaylistCommand";
import { NextCommand } from "../command/nextCommand";
import { PauseCommand } from "../command/pauseCommand";
import { PlayCommand } from "../command/playCommand";
import { ResumeCommand } from "../command/resumeCommand";
import { ShowCommand } from "../command/showCommand";
import { listPlaylistHandler, loadPlaylistHandler, nextCmdHandler, pauseCmdHandler, playCmdHandler, resumeCmdHandler, showCmdHandler, stopCmdHandler } from "../handler";
import { getHelpMessage } from "../utils/helper";

export interface IVisitor {
  visitLoadPlaylistCommand(cmd: LoadPlaylistCommand): void;
  visitHelp(cmd: HelpCommand): void;
  visitShowCommand(cmd: ShowCommand): void;
  visitByeCommand(cmd: ByeCommand): void;
  visitPauseCommand(cmd: PauseCommand): void;
  visitPlayCommand(cmd: PlayCommand): void;
  visitNextCommand(cmd: NextCommand): void;
  visitResumeCommand(cmd: ResumeCommand): void;
  visitListPlaylistCommand(cmd: ListPlaylistCommand): void;
}

export class CommandVisitor implements IVisitor {
  public async visitLoadPlaylistCommand(cmd: LoadPlaylistCommand): Promise<void> {
    await loadPlaylistHandler(cmd.getMessage(), cmd.getMap());
  }

  public async visitListPlaylistCommand(cmd: ListPlaylistCommand): Promise<void> {
    await listPlaylistHandler(cmd.getMessage(), cmd.getMap());
  }

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

