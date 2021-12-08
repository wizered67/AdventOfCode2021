import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const positions = this.parseInput();
    const minNum = min(positions);
    const maxNum = max(positions);

    let minDifferences;
    for (let i = minNum; i < maxNum; i++) {
      const val = calculateCost(positions, i, constantCost);
      if (minDifferences === undefined || val < minDifferences) {
        minDifferences = val;
      }
    }
    // WRITE SOLUTION FOR TEST 1
    return `${minDifferences}`;
  }

  private parseInput(): number[] {
    return this.input.split(',').map((num) => Number.parseInt(num));
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const positions = this.parseInput();
    const minNum = min(positions);
    const maxNum = max(positions);

    let minDifferences;
    for (let i = minNum; i < maxNum; i++) {
      const val = calculateCost(positions, i, increasingCost);
      if (minDifferences === undefined || val < minDifferences) {
        minDifferences = val;
      }
    }
    // WRITE SOLUTION FOR TEST 1
    return `${minDifferences}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

function calculateCost(
  nums: number[],
  from: number,
  costFn: (from: number, to: number) => number
) {
  return nums.reduce((prev, cur) => prev + costFn(from, cur), 0);
}

function constantCost(from: number, to: number) {
  return Math.abs(from - to);
}

function increasingCost(from: number, to: number) {
  const dist = Math.abs(from - to);
  return (dist * (dist + 1)) / 2;
}

function min(nums: number[]) {
  return nums.sort((a, b) => a - b)[0];
}

function max(nums: number[]) {
  return nums.sort((a, b) => b - a)[0];
}
