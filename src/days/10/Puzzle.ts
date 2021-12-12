import Puzzle from '../../types/AbstractPuzzle';

const STARTING_CHARACTERS = ['[', '{', '<', '('] as const;
type StartingCharacter = typeof STARTING_CHARACTERS[number];
type EndingCharacter = ')' | '>' | ']' | '}';
const ENDING_CHARACTERS_TO_START: Record<EndingCharacter, StartingCharacter> = {
  ')': '(',
  '>': '<',
  ']': '[',
  '}': '{',
};
const STARTING_CHARACTERS_TO_END: Record<StartingCharacter, EndingCharacter> = {
  '(': ')',
  '<': '>',
  '[': ']',
  '{': '}',
};

const CORRUPTED_SCORES: Record<EndingCharacter, number> = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

const AUTOCOMPLETE_SCORES: Record<EndingCharacter, number> = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const lines = this.input.split('\n');
    const illegalCharacters = lines.map((line) => findIllegalCharacter(line));
    return `${illegalCharacters
      .map((char) => (char ? CORRUPTED_SCORES[char] : 0))
      .reduce((prev, cur) => prev + cur, 0)}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    const lines = this.input.split('\n');
    const nonCorruptedLines = lines.filter(
      (line) => findIllegalCharacter(line) === undefined
    );
    const completions = nonCorruptedLines.map((line) => findCompletions(line));
    const scores = completions.map((completion) =>
      scoreForCompletion(completion)
    );
    return `${scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)]}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

function findIllegalCharacter(line: string): EndingCharacter | undefined {
  const currentContext = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i] as StartingCharacter | EndingCharacter;
    if (isStartingCharacter(char)) {
      currentContext.push(char);
    } else if (currentContext.pop() !== ENDING_CHARACTERS_TO_START[char]) {
      return char;
    }
  }
}

function findCompletions(line: string): EndingCharacter[] {
  const currentContext: StartingCharacter[] = [];
  for (let i = 0; i < line.length; i++) {
    const char = line[i] as StartingCharacter | EndingCharacter;
    if (isStartingCharacter(char)) {
      currentContext.push(char);
    } else {
      // Should always be the correct one to pop since we filter out corruption.
      currentContext.pop();
    }
  }
  return currentContext
    .reverse()
    .map((char) => STARTING_CHARACTERS_TO_END[char]);
}

function scoreForCompletion(completions: EndingCharacter[]) {
  let score = 0;
  for (const char of completions) {
    score *= 5;
    score += AUTOCOMPLETE_SCORES[char];
  }
  return score;
}

function isStartingCharacter(char: string): char is StartingCharacter {
  return STARTING_CHARACTERS.includes(char as StartingCharacter);
}
