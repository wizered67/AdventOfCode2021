import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string | number {
    const caveSystem = this.parseInput();
    const start = caveSystem.start;
    return countPaths(start, new Set());
  }

  private parseInput() {
    const lines = this.input.split('\n');
    const edges = lines.map((line) => line.split('-'));
    const validEdges = edges.filter(
      (edge): edge is [string, string] => edge.length === 2
    );
    if (validEdges.length !== edges.length) {
      throw new Error('Invalid edge!');
    }
    return new CaveSystem(validEdges);
  }

  public getFirstExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string | number {
    const caveSystem = this.parseInput();
    const start = caveSystem.start;
    return countPaths2(start, new Set(), false);
  }

  public getSecondExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

function countPaths(from: CaveNode, visitedSmall: Set<CaveNode>) {
  if (from.isEnd) {
    return 1;
  }
  let paths = 0;
  const newVisitedSmall = new Set(visitedSmall);
  if (!from.isBig) {
    newVisitedSmall.add(from);
  }
  for (const node of from.edges) {
    if (visitedSmall.has(node)) {
      continue;
    }
    paths += countPaths(node, newVisitedSmall);
  }
  return paths;
}

function countPaths2(
  from: CaveNode,
  visitedSmall: Set<CaveNode>,
  hasVisitedTwice: boolean
) {
  if (from.isEnd) {
    return 1;
  }
  let paths = 0;
  const newVisitedSmall = new Set(visitedSmall);
  if (!from.isBig) {
    newVisitedSmall.add(from);
  }
  for (const node of from.edges) {
    if (node.isStart) {
      continue;
    }
    if (visitedSmall.has(node)) {
      if (!hasVisitedTwice) {
        paths += countPaths2(node, newVisitedSmall, true);
      }
      continue;
    }
    paths += countPaths2(node, newVisitedSmall, hasVisitedTwice);
  }
  return paths;
}

class CaveSystem {
  start: CaveNode;
  allNodes: Map<string, CaveNode> = new Map();
  constructor(edges: [from: string, to: string][]) {
    for (const [from, to] of edges) {
      let fromNode = this.allNodes.get(from);
      if (!fromNode) {
        fromNode = new CaveNode(from);
        this.allNodes.set(from, fromNode);
      }

      let toNode = this.allNodes.get(to);
      if (!toNode) {
        toNode = new CaveNode(to);
        this.allNodes.set(to, toNode);
      }

      fromNode.addEdge(toNode);
      toNode.addEdge(fromNode);
    }
    const start = this.allNodes.get('start');
    if (!start) {
      throw new Error('No start node found');
    }
    this.start = start;
  }
}

class CaveNode {
  readonly name: string;
  readonly isBig: boolean;
  readonly isEnd: boolean;
  readonly isStart: boolean;
  edges: Set<CaveNode> = new Set();

  constructor(name: string) {
    this.name = name;
    this.isBig = name.toLowerCase() !== name;
    this.isEnd = name === 'end';
    this.isStart = name === 'start';
  }

  addEdge(node: CaveNode) {
    this.edges.add(node);
  }
}
