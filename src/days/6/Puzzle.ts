import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
  public solveFirst(): string {
    const fishesByDays: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const starting = this.input
      .split(',')
      .map((daysString) => Number.parseInt(daysString));
    for (const startNum of starting) {
      fishesByDays[startNum]++;
    }

    for (let d = 0; d < 256; d++) {
      const num0Days = fishesByDays[0];
      for (let i = 0; i < fishesByDays.length; i++) {
        fishesByDays[i] = fishesByDays[i + 1];
      }
      fishesByDays[6] += num0Days;
      fishesByDays[8] = num0Days;
    }

    return `${fishesByDays.reduce((prev, cur) => prev + cur, 0)}`;
    // const fishes = this.parseInput();
    // for (let i = 0; i < 80; i++) {
    //   const newFishes = [];
    //   for (const fish of fishes) {
    //     const newFish = fish.simulateDay();
    //     if (newFish) {
    //       newFishes.push(newFish);
    //     }
    //   }
    //   fishes.push(...newFishes);
    //   // console.log(fishes.map((fish) => fish.remainingDaysToSpawn).join(','));
    // }
    // return `${fishes.length}`;
  }

  // private parseInput(): LanternFish[] {
  //   const spawnTimes = this.input
  //     .split(',')
  //     .map((daysString) => Number.parseInt(daysString));
  //   return spawnTimes.map((remainingTime) => new LanternFish(remainingTime));
  // }

  public getFirstExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 1;
    return 'day 1 solution 1';
  }

  public solveSecond(): string {
    // WRITE SOLUTION FOR TEST 2
    return 'day 1 solution 2';
  }

  public getSecondExpectedResult(): string {
    // RETURN EXPECTED SOLUTION FOR TEST 2;
    return 'day 1 solution 2';
  }
}

// const DEFAULT_DAYS_TO_SPAWN = 6;
// const DELAYED_DAYS_TO_SPAWN = 8;

// class LanternFish {
//   remainingDaysToSpawn: number;

//   constructor(remainingDaysToSpawn: number) {
//     this.remainingDaysToSpawn = remainingDaysToSpawn;
//   }

//   simulateDay(): LanternFish | undefined {
//     if (this.remainingDaysToSpawn === 0) {
//       this.remainingDaysToSpawn = DEFAULT_DAYS_TO_SPAWN;
//       return new LanternFish(DELAYED_DAYS_TO_SPAWN);
//     } else {
//       this.remainingDaysToSpawn--;
//     }
//   }
// }
