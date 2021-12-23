import Puzzle from '../../types/AbstractPuzzle';

type PolymerElement =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

type PolymerPair = [PolymerElement, PolymerElement];

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string | number {
    return this.solvePuzzle(10);
  }

  public getFirstExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string | number {
    const { startingPolymer, insertionRules } = this.parseInput();
    const solver = new Solver(insertionRules, startingPolymer);
    for (let i = 0; i < 40; i++) {
      solver.handleStep();
    }
    return solver.getAnswer();
  }

  public getSecondExpectedResult(): string | number {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }

  private parseInput() {
    const lines = this.input.split('\n');
    const startingPolymer = lines[0].split('') as PolymerElement[];
    const insertionRules = new InsertionRules(
      parseInsertionRules(lines.slice(2))
    );

    return { startingPolymer, insertionRules };
  }

  private solvePuzzle(numSteps: number) {
    const { startingPolymer, insertionRules } = this.parseInput();
    let polymer = startingPolymer;
    for (let i = 0; i < numSteps; i++) {
      polymer = handleStep(polymer, insertionRules);
    }
    const elementFrequencies: Partial<Record<PolymerElement, number>> = {};
    for (const element of polymer) {
      elementFrequencies[element] = (elementFrequencies[element] ?? 0) + 1;
    }
    const sortedFrequencyAmounts = Object.values(elementFrequencies).sort(
      (a, b) => a - b
    );
    return (
      sortedFrequencyAmounts[sortedFrequencyAmounts.length - 1] -
      sortedFrequencyAmounts[0]
    );
  }
}

const INSERTION_RULE_REGEX = /([A-Z][A-Z]) -> ([A-Z])/;

function parseInsertionRules(lines: string[]) {
  return lines.map((line) => {
    const matches = line.match(INSERTION_RULE_REGEX);
    if (!matches) {
      throw new Error(`Regex didn't match for line ${line}`);
    }
    return { from: matches[1], to: matches[2] as PolymerElement };
  });
}

class InsertionRules {
  private inputPairToResult: Record<string, PolymerElement> = {};
  constructor(rawRules: { from: string; to: PolymerElement }[]) {
    for (const rule of rawRules) {
      this.inputPairToResult[rule.from] = rule.to;
    }
  }

  getInsertion(pair: PolymerPair | string) {
    return this.inputPairToResult[pair[0] + pair[1]];
  }

  getAllPairs() {
    return Object.keys(this.inputPairToResult);
  }
}

class Solver {
  private initial: PolymerElement[];
  private transitions: Record<string, [string, string]> = {};
  private pairDistributions: Record<string, number> = {};
  constructor(rules: InsertionRules, initialPolymer: PolymerElement[]) {
    for (const pair of rules.getAllPairs()) {
      const insertion = rules.getInsertion(pair);
      const newLeft = pair[0] + insertion;
      const newRight = insertion + pair[1];
      this.transitions[pair] = [newLeft, newRight];
    }
    for (const pair of getPairs(initialPolymer)) {
      const pairString = pair[0] + pair[1];
      this.pairDistributions[pairString] =
        (this.pairDistributions[pairString] ?? 0) + 1;
    }
    this.initial = initialPolymer;
  }

  handleStep() {
    const newPairDistributions: Record<string, number> = {};
    for (const [pair, frequency] of Object.entries(this.pairDistributions)) {
      const [newLeft, newRight] = this.transitions[pair];
      newPairDistributions[newLeft] =
        (newPairDistributions[newLeft] ?? 0) + frequency;
      newPairDistributions[newRight] =
        (newPairDistributions[newRight] ?? 0) + frequency;
    }
    this.pairDistributions = newPairDistributions;
  }

  getAnswer() {
    const elementFrequencies: Partial<Record<PolymerElement, number>> = {};
    for (const [pair, frequency] of Object.entries(this.pairDistributions)) {
      const leftElement = pair[0] as PolymerElement;
      elementFrequencies[leftElement] =
        (elementFrequencies[leftElement] ?? 0) + frequency;
    }
    const initialLastElement = this.initial[this.initial.length - 1];
    elementFrequencies[initialLastElement] =
      (elementFrequencies[initialLastElement] ?? 0) + 1;
    const sortedFrequencyAmounts = Object.values(elementFrequencies).sort(
      (a, b) => a - b
    );
    return (
      sortedFrequencyAmounts[sortedFrequencyAmounts.length - 1] -
      sortedFrequencyAmounts[0]
    );
  }
}

function handleStep(polymer: PolymerElement[], rules: InsertionRules) {
  const pairs = getPairs(polymer);
  const insertions = pairs.map((pair) => rules.getInsertion(pair));
  const result: PolymerElement[] = [];
  for (let i = 0; i < polymer.length - 1; i++) {
    result.push(polymer[i]);
    result.push(insertions[i]);
  }
  result.push(polymer[polymer.length - 1]);
  return result;
}

function getPairs(polymer: PolymerElement[]): PolymerPair[] {
  const pairs: PolymerPair[] = [];
  for (let i = 0; i < polymer.length - 1; i++) {
    pairs.push([polymer[i], polymer[i + 1]]);
  }
  return pairs;
}
