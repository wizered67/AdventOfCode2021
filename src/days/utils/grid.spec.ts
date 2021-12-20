import { listNeighborsWithDiagonals } from './grid';

const exampleGrid = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
];

describe('grid', () => {
  describe('listNeighborsWithDiagonals', () => {
    it('top left', () => {
      expectSameArray(listNeighborsWithDiagonals(exampleGrid, 0, 0), [
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ]);
    });
    it('top center', () => {
      expectSameArray(listNeighborsWithDiagonals(exampleGrid, 0, 2), [
        { row: 0, col: 1 },
        { row: 0, col: 3 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
        { row: 1, col: 3 },
      ]);
    });
  });
});

function expectSameArray(actual: unknown[], expected: unknown[]) {
  expect(actual).toEqual(expect.arrayContaining(expected));
  expect(actual).toHaveLength(expected.length);
}
