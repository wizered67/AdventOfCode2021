export interface Position {
  row: number;
  col: number;
}

function getSpaceOrUndefined(grid: number[][], row: number, col: number) {
  return (grid[row] ?? [])[col];
}

export function listNeighbors(
  grid: number[][],
  row: number,
  col: number
): Position[] {
  return [
    { row: row - 1, col },
    { row: row + 1, col },
    { row, col: col - 1 },
    { row, col: col + 1 },
  ].filter(({ row, col }) => getSpaceOrUndefined(grid, row, col) !== undefined);
}

export function listNeighborsWithDiagonals(
  grid: number[][],
  row: number,
  col: number
): Position[] {
  return [-1, 0, 1]
    .flatMap((i) => [-1, 0, 1].map((j) => ({ row: row + i, col: col + j })))
    .filter(
      ({ row, col }) => getSpaceOrUndefined(grid, row, col) !== undefined
    );
}

export function listPositions(grid: number[][]) {
  const result: Position[] = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      result.push({ row, col });
    }
  }
  return result;
}

export function parseGrid(input: string): number[][] {
  const inputLines = input.split('\n');
  return inputLines.map((line) =>
    line.split('').map((num) => Number.parseInt(num))
  );
}

export class PositionSet {
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
