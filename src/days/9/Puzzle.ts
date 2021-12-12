import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const grid = this.parseInput();
    return `${findLowPoints(grid)
      .map(({ row, col }) => grid[row][col])
      .reduce((prev, cur) => prev + cur + 1, 0)}`;
  }

  private parseInput(): number[][] {
    const inputLines = this.input.split('\n');
    return inputLines.map((line) =>
      line.split('').map((num) => Number.parseInt(num))
    );
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const grid = this.parseInput();
    const lowPoints = findLowPoints(grid);
    const descendingBasinSizes = lowPoints
      .map((lowPoint) => findBasinSize(grid, lowPoint))
      .sort((a, b) => b - a);
    return `${
      descendingBasinSizes[0] *
      descendingBasinSizes[1] *
      descendingBasinSizes[2]
    }`;
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

function findBasinSize(grid: number[][], lowPoint: Position) {
  const seenPositions = new PositionSet();
  const basinPositions = [];
  const consideringPositions = [lowPoint];
  while (consideringPositions.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const position = consideringPositions.pop()!;
    basinPositions.push(position);
    seenPositions.add(position);
    const neighborsInBasin = listNeighbors(
      grid,
      position.row,
      position.col
    ).filter(
      (neighbor) =>
        !seenPositions.has(neighbor) &&
        grid[neighbor.row][neighbor.col] > grid[position.row][position.col] &&
        grid[neighbor.row][neighbor.col] !== 9
    );
    consideringPositions.push(...neighborsInBasin);
    neighborsInBasin.forEach((neighbor) => seenPositions.add(neighbor));
  }

  console.log(basinPositions);
  console.log(basinPositions.length);

  return basinPositions.length;
}

function getSpaceOrUndefined(grid: number[][], row: number, col: number) {
  return (grid[row] ?? [])[col];
}

function listNeighbors(grid: number[][], row: number, col: number): Position[] {
  return [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ].filter(({ row, col }) => getSpaceOrUndefined(grid, row, col) !== undefined);
}

function findLowPoints(grid: number[][]): Position[] {
  const results = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (
        listNeighbors(grid, row, col).every(
          ({ row: neighborRow, col: neighborCol }) =>
            grid[row][col] < grid[neighborRow][neighborCol]
        )
      ) {
        results.push({ row, col });
      }
    }
  }

  return results;
}

class PositionSet {
  private set = new Set<`${number}_${number}`>();

  private positionToString(position: Position) {
    return `${position.row}_${position.col}` as const;
  }

  has(position: Position) {
    return this.set.has(this.positionToString(position));
  }

  add(position: Position) {
    this.set.add(this.positionToString(position));
  }
}
