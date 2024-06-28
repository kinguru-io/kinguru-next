import { describe, it, expect } from "vitest";
import { prepareAbbreviation } from "./prepare-abbr";

describe("prepare abbreviation", () => {
  it("1,2,3 words", () => {
    expect(prepareAbbreviation("John")).toBe("J");
    expect(prepareAbbreviation("john doe")).toBe("jd");
    expect(prepareAbbreviation("red green blue")).toBe("rg");
  });

  it("not trimmed", () => {
    expect(prepareAbbreviation(" john  Doe ")).toBe("jD");
  });
});
