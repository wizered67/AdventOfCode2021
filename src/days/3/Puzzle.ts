import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const bitStrings = this.input.split('\n');
    const { most: gammaString, least: epsilonString } =
      determineCommonBitString(bitStrings);
    const gamma = Number.parseInt(gammaString, 2);
    const epsilon = Number.parseInt(epsilonString, 2);
    console.log('gamma', gamma);
    console.log('epsilon', epsilon);
    return `${gamma * epsilon}`;
  }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return '198';
  }

  public solveSecond(): string {
    const bitStrings = this.input.split('\n');
    const oxygenGeneratorRating = determineRating(bitStrings, 'most');
    const co2ScrubberRating = determineRating(bitStrings, 'least');
    // WRITE SOLUTION FOR TEST 2
    return `${oxygenGeneratorRating * co2ScrubberRating}`;
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

function determineCommonBitString(bitStrings: string[]): {
  most: string;
  least: string;
} {
  const length = bitStrings[0].length;
  let mostCommonString = '';
  let leastCommonString = '';
  for (let i = 0; i < length; i++) {
    let zeroCount = 0;
    let oneCount = 0;
    for (const bitString of bitStrings) {
      if (bitString[i] === '0') {
        zeroCount++;
      } else if (bitString[i] === '1') {
        oneCount++;
      } else {
        throw new Error(
          `Unexpected character in ${bitString} at index ${i}: ${bitString[i]}`
        );
      }
    }
    mostCommonString += zeroCount > oneCount ? '0' : '1';
    leastCommonString += zeroCount > oneCount ? '1' : '0';
  }
  return { most: mostCommonString, least: leastCommonString };
}

function determineRating(bitStrings: string[], type: 'most' | 'least') {
  let candidates = bitStrings;
  for (let i = 0; i < candidates[0].length; i++) {
    const comparisonBitString =
      type === 'most'
        ? determineCommonBitString(candidates).most
        : determineCommonBitString(candidates).least;
    candidates = candidates.filter(
      (bitString) => bitString[i] === comparisonBitString[i]
    );
    if (candidates.length === 1) {
      console.log('rating', candidates[0]);
      return Number.parseInt(candidates[0], 2);
    }
  }
  throw new Error('Failed to find rating.');
}
