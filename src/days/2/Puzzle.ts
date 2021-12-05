import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    let depth = 0;
    let horizontal = 0;
    const commands = this.input
      .split('\n')
      .map((command) => parseCommand(command));
    for (const [commandType, amount] of commands) {
      switch (commandType) {
        case 'forward':
          horizontal += amount;
          break;
        case 'down':
          depth += amount;
          break;
        case 'up':
          depth -= amount;
          break;
      }
    }
    console.log('horizontal', horizontal);
    console.log('depth', depth);
    return `${horizontal * depth}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '150';
  }

  public solveSecond(): string {
    let depth = 0;
    let horizontal = 0;
    let aim = 0;
    const commands = this.input
      .split('\n')
      .map((command) => parseCommand(command));
    for (const [commandType, amount] of commands) {
      switch (commandType) {
        case 'forward':
          horizontal += amount;
          depth += aim * amount;
          break;
        case 'down':
          aim += amount;
          break;
        case 'up':
          aim -= amount;
          break;
      }
    }
    console.log('horizontal', horizontal);
    console.log('depth', depth);
    return `${horizontal * depth}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

const COMMAND_REGEX = /(.*) (\d+)/;

const VALID_COMMANDS = ['forward', 'up', 'down'] as const;
type CommandType = typeof VALID_COMMANDS[number];

function parseCommand(command: string): [command: CommandType, amount: number] {
  const matches = command.match(COMMAND_REGEX);
  if (!matches) {
    throw new Error(`Regex failed to match '${command}'`);
  }
  const [_, commandType, amountString] = matches;

  checkCommandType(commandType);
  const amount = Number.parseInt(amountString);

  return [commandType, amount];
}

function checkCommandType(input: string): asserts input is CommandType {
  if (!VALID_COMMANDS.includes(input as CommandType)) {
    throw new Error(`Unexpected command type ${input}`);
  }
}
