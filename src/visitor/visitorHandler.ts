import { ICommand } from "../command/command";
import { IVisitor } from "../visitor/visitor";

export class VisitorHandler {
  private elements: ICommand[] = [];

  public attach(e: ICommand): void {
    this.elements.push(e);
  }

  public detach(e: ICommand): void {
    const index = this.elements.indexOf(e);
    if (!index) return;
    this.elements.splice(index, 1);
  }

  public operate(visitor: IVisitor): void {
    const max = this.elements.length;
    for (let i = 0; i < max; i += 1) {
      const elt = this.elements[i];
      if (!elt) return;
      elt.operate(visitor);
    }
  }
}
