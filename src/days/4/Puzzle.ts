import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const { boards, numbers } = this.parseInput();
    // boards.forEach((board) => board.printBoard());
    for (const num of numbers) {
      console.log(`called ${num}`);
      for (const board of boards) {
        if (board.markSpace(num)) {
          // board.printBoard();
          return `${board.calculateFinalScore(num)}`;
        }
      }
    }
    throw new Error('No winner!');
  }

  private parseInput() {
    const lines = this.input.split('\n');
    const numbers = lines
      .shift()
      ?.split(',')
      .map((num) => Number.parseInt(num));
    if (!numbers) {
      throw new Error('No numbers found.');
    }
    lines.shift();
    const boards: BingoBoard[] = [];
    while (lines.length > 0) {
      boards.push(this.parseBoard(lines));
    }

    return { numbers, boards };
  }

  private parseBoard(lines: string[]): BingoBoard {
    const spaces: number[][] = [];
    while (lines.length > 0) {
      const nextLine = lines.shift();
      if (nextLine === undefined || nextLine === '') {
        break;
      }
      const numsOnLine = nextLine
        .split(' ')
        .filter((numOrWs) => numOrWs !== '')
        .map((num) => Number.parseInt(num));
      spaces.push(numsOnLine);
    }
    return new BingoBoard(spaces);
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const { boards, numbers } = this.parseInput();
    // boards.forEach((board) => board.printBoard());
    const winnerIndexes = new Set();
    for (const num of numbers) {
      console.log(`called ${num}`);
      for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        if (board.markSpace(num)) {
          // board.printBoard();
          winnerIndexes.add(i);
          if (winnerIndexes.size === boards.length) {
            return `${board.calculateFinalScore(num)}`;
          }
        }
      }
    }
    throw new Error('No winner!');
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

interface Position {
  row: number;
  col: number;
}

class BingoBoard {
  private marked: boolean[][] = [];
  private numberToPosition: Record<number, Position> = {};
  private spaces: readonly number[][];

  constructor(spaces: readonly number[][]) {
    this.spaces = spaces;

    for (let row = 0; row < spaces.length; row++) {
      this.marked[row] = [];
      for (let col = 0; col < spaces[row].length; col++) {
        this.marked[row][col] = false;
        const num = spaces[row][col];
        this.numberToPosition[num] = { row, col };
      }
    }
  }

  /** Markes a space and returns whether the board is in a winning state. */
  markSpace(num: number): boolean {
    const position = this.numberToPosition[num];
    if (position === undefined) {
      return false;
    }
    this.marked[position.row][position.col] = true;
    return this.isWin(position);
  }

  isWin(position: Position): boolean {
    return this.isColWin(position.col) || this.isRowWin(position.row);
  }

  private isColWin(colToCheck: number): boolean {
    for (let row = 0; row < this.marked.length; row++) {
      if (!this.marked[row][colToCheck]) {
        return false;
      }
    }

    return true;
  }

  private isRowWin(rowToCheck: number): boolean {
    for (let col = 0; col < this.marked[rowToCheck].length; col++) {
      if (!this.marked[rowToCheck][col]) {
        return false;
      }
    }

    return true;
  }

  printBoard() {
    let str = '=======================';
    for (let row = 0; row < this.spaces.length; row++) {
      for (let col = 0; col < this.spaces[row].length; col++) {
        if (this.marked[row][col]) {
          str += `[${this.spaces[row][col]}] `;
        } else {
          str += `${this.spaces[row][col]} `;
        }
      }
      str += '\n';
    }
    str += '=======================';
    console.log(str);
  }

  calculateFinalScore(finalCalled: number) {
    let score = 0;
    for (let row = 0; row < this.spaces.length; row++) {
      for (let col = 0; col < this.spaces[row].length; col++) {
        if (!this.marked[row][col]) {
          // console.log(row, col, this.spaces[row][col]);
          score += this.spaces[row][col];
        }
      }
    }
    console.log({ score, finalCalled });
    return score * finalCalled;
  }
}
