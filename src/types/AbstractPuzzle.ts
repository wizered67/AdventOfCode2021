import { PuzzleInterface } from './PuzzleInterface';

export default abstract class Puzzle implements PuzzleInterface {
  protected input!: string;

  public async setInput(input: string) {
    this.input = input;
  }

  public abstract solveFirst(): string | number;
  public abstract getFirstExpectedResult(): string | number;
  public abstract solveSecond(): string | number;
  public abstract getSecondExpectedResult(): string | number;
}
