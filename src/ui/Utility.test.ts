import { getNeighbors, getOptions, Coordinate } from "./Utility";

describe("getOptions", () => {
  it("should return an empty array when selection is empty", () => {
    const selection: Coordinate[] = [];
    const options = getOptions(selection);
    expect(options).toEqual([]);
  });

  it.skip.each([
    { selection: [{ col: 0, row: 1 }] },
    { selection: [{ col: 1, row: 0 }] },
    { selection: [{ col: 1, row: 2 }] },
    { selection: [{ col: 7, row: 0 }] },
  ])(
    "should throw an error when coordinate is not a doubled coordinate",
    ({ selection }) => {
      expect(getOptions(selection)).toThrow(
        "Not doubled coordinate: " + JSON.stringify(selection)
      );
    }
  );

  it.skip.each([
    { selection: [{ col: 0, row: 0 }] },
    { selection: [{ col: 0, row: 2 }] },
    { selection: [{ col: 0, row: 4 }] },
    { selection: [{ col: 2, row: 0 }] },
    { selection: [{ col: 0, row: 12 }] },
    { selection: [{ col: 14, row: 0 }] },
  ])(
    "should throw an error when coordinate is out of bounds",
    ({ selection }) => {
      expect(getOptions(selection)).toThrow(
        "Out of bounds: " + JSON.stringify(selection)
      );
    }
  );
});

describe("getNeighbors", () => {
  it("returns neighbours when selection in top left position", () => {
    const options = getNeighbors({ col: 4, row: 0 });
    expect(options).toEqual([
      { col: 6, row: 0 },
      { col: 3, row: 1 },
      { col: 5, row: 1 },
    ]);
  });

  it("returns neighbours when selection in top right position", () => {
    const options = getNeighbors({ col: 12, row: 0 });
    expect(options).toEqual([
      { col: 10, row: 0 },
      { col: 11, row: 1 },
      { col: 13, row: 1 },
    ]);
  });

  it.skip("returns neighbours when selection in middle left position", () => {
    const options = getNeighbors({ col: 0, row: 4 });
    expect(options).toEqual([
      { col: 1, row: 3 },
      { col: 2, row: 4 },
      { col: 1, row: 5 },
    ]);
  });

  it.skip("returns neighbours when selection in absolute middle position", () => {
    const options = getNeighbors({ col: 8, row: 4 });
    expect(options).toEqual([
      { col: 6, row: 3 },
      { col: 8, row: 3 },
      { col: 6, row: 4 },
      { col: 10, row: 4 },
      { col: 6, row: 5 },
      { col: 8, row: 5 },
    ]);
  });

  it.skip("returns neighbours when selection in middle right position", () => {});

  it.skip("returns neighbours when selection in bottom left position", () => {});

  it.skip("returns neighbours when selection in bottom right position", () => {});
});
