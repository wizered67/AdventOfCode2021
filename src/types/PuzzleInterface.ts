export interface PuzzleInterface {
  solveFirst: () => string | number;
  solveSecond: () => string | number;
  getFirstExpectedResult: () => string | number;
  getSecondExpectedResult: () => string | number;
}
