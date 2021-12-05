import Puzzle from '../../types/AbstractPuzzle';

const INPUT_REGEX = /(\d+),(\d+) -> (\d+),(\d+)/g;

interface LinePoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Point {
  x: number;
  y: number;
}

class Line implements LinePoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(lp: LinePoints) {
    this.x1 = lp.x1;
    this.y1 = lp.y1;
    this.x2 = lp.x2;
    this.y2 = lp.y2;
  }

  isHorizontalOrVertical() {
    return this.x1 === this.x2 || this.y1 === this.y2;
  }

  coveredPoints(): Point[] {
    if (this.isHorizontalOrVertical()) {
      const startX = Math.min(this.x1, this.x2);
      const endX = Math.max(this.x1, this.x2);
      const startY = Math.min(this.y1, this.y2);
      const endY = Math.max(this.y1, this.y2);

      const points: Point[] = [];
      for (let x = startX; x <= endX; x++) {
        for (let y = startY; y <= endY; y++) {
          points.push({ x, y });
        }
      }

      return points;
    }

    let startPoint: Point;
    let endPoint: Point;
    if (this.x1 < this.x2) {
      startPoint = { x: this.x1, y: this.y1 };
      endPoint = { x: this.x2, y: this.y2 };
    } else {
      startPoint = { x: this.x2, y: this.y2 };
      endPoint = { x: this.x1, y: this.y1 };
    }

    const slopeDirection = endPoint.y > startPoint.y ? 1 : -1;
    const points: Point[] = [];
    let y = startPoint.y;
    for (let x = startPoint.x; x <= endPoint.x; x++, y += slopeDirection) {
      points.push({ x, y });
    }

    return points;
  }
}

function getNumIntersections(lines: Line[]): number {
  const pointToNumOverlaps: Map<`${number}_${number}`, number> = new Map();

  for (const line of lines) {
    for (const { x, y } of line.coveredPoints()) {
      const pointString = `${x}_${y}` as const;
      pointToNumOverlaps.set(
        pointString,
        (pointToNumOverlaps.get(pointString) ?? 0) + 1
      );
    }
  }

  return [...pointToNumOverlaps.values()].filter(
    (numOverlaps) => numOverlaps > 1
  ).length;
}

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const lines = this.parseInput();
    return `${getNumIntersections(
      lines.filter((line) => line.isHorizontalOrVertical())
    )}`;
  }

  private parseInput(): Line[] {
    const matches = [...this.input.matchAll(INPUT_REGEX)];
    return matches.map(
      (match) =>
        new Line({
          x1: Number.parseInt(match[1]),
          y1: Number.parseInt(match[2]),
          x2: Number.parseInt(match[3]),
          y2: Number.parseInt(match[4]),
        })
    );
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const lines = this.parseInput();
    return `${getNumIntersections(lines)}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}
