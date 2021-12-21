import Puzzle from '../../types/AbstractPuzzle';
import { GeneralSet } from '../utils/set';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string | number {
    const { dots, folds } = parseInstructions(this.input);
    const positions = new GeneralSet<Dot>(dots, (dot) => `${dot[0]}_${dot[1]}`);
    handleFold(positions, folds[0]);
    return [...positions.values()].length;
  }

  public getFirstExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string | number {
    const { dots, folds } = parseInstructions(this.input);
    const positions = new GeneralSet<Dot>(dots, (dot) => `${dot[0]}_${dot[1]}`);
    for (const fold of folds) {
      handleFold(positions, fold);
    }
    printDots(positions);
    return '';
  }

  public getSecondExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

function handleFold(positions: GeneralSet<Dot>, fold: Fold) {
  for (const [x, y] of positions) {
    if (fold.axis === 'x') {
      if (x > fold.position) {
        positions.delete([x, y]);
        positions.add([computeFoldPosition(x, fold.position), y]);
      }
    } else {
      if (y > fold.position) {
        positions.delete([x, y]);
        positions.add([x, computeFoldPosition(y, fold.position)]);
      }
    }
  }
}

function computeFoldPosition(originalPosition: number, foldPosition: number) {
  return foldPosition - (originalPosition - foldPosition);
}

function printDots(positions: GeneralSet<Dot>) {
  let maxX = 0;
  let maxY = 0;
  for (const [x, y] of positions) {
    if (x > maxX) {
      maxX = x;
    }
    if (y > maxY) {
      maxY = y;
    }
  }

  const grid: string[][] = [];
  for (let y = 0; y <= maxY; y++) {
    grid.push(new Array(maxX).fill('.'));
  }
  for (const [x, y] of positions) {
    grid[y][x] = '#';
  }
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      process.stdout.write(grid[y][x]);
    }
    process.stdout.write('\n');
  }
}

type Dot = [x: number, y: number];

interface Fold {
  axis: 'x' | 'y';
  position: number;
}

function parseInstructions(input: string) {
  const inputLines = input.split('\n');
  const instructionSplit = inputLines.indexOf('');
  return {
    dots: parseDots(inputLines.slice(0, instructionSplit)),
    folds: parseFolds(inputLines.slice(instructionSplit + 1)),
  };
}

function parseDots(dotLines: string[]): Dot[] {
  return dotLines.map(
    (line) =>
      line.split(',').map((num) => Number.parseInt(num)) as [number, number]
  );
}

const FOLD_REGEX = /fold along ([xy])=(\d+)/;

function parseFolds(foldLines: string[]): Fold[] {
  return foldLines.map((line) => {
    const matches = line.match(FOLD_REGEX);
    if (!matches) {
      throw new Error(`Regex didn't match line: ${line}`);
    }
    const [_, axis, position] = matches;
    return { axis: axis as 'x' | 'y', position: Number.parseInt(position) };
  });
}
