import Puzzle from '../../types/AbstractPuzzle';
import {
  listNeighborsWithDiagonals,
  listPositions,
  parseGrid,
  PositionSet,
} from '../utils/grid';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string | number {
    const grid = parseGrid(this.input);
    let numFlashes = 0;
    for (let step = 0; step < 100; step++) {
      numFlashes += handleStep(grid);
    }
    return numFlashes;
  }

  public getFirstExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string | number {
    const grid = parseGrid(this.input);
    const gridSize = listPositions(grid).length;
    let step = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const numFlashes = handleStep(grid);
      if (numFlashes === gridSize) {
        return step;
      }
      step++;
    }
  }

  public getSecondExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

/** Handles a step on the grid and returns the number of flashes. */
function handleStep(grid: number[][]) {
  const flashedPositions = new PositionSet();
  for (const { row, col } of listPositions(grid)) {
    grid[row][col]++;
  }
  let numFlashes = 0;
  let prevFlashes = undefined;
  while (prevFlashes !== numFlashes) {
    prevFlashes = numFlashes;
    for (const { row, col } of listPositions(grid)) {
      if (grid[row][col] > 9 && !flashedPositions.has({ row, col })) {
        numFlashes++;
        for (const {
          row: neighborRow,
          col: neighborCol,
        } of listNeighborsWithDiagonals(grid, row, col)) {
          grid[neighborRow][neighborCol]++;
        }
        flashedPositions.add({ row, col });
      }
    }
  }
  for (const { row, col } of listPositions(grid)) {
    if (grid[row][col] > 9) {
      grid[row][col] = 0;
    }
  }
  return numFlashes;
}
