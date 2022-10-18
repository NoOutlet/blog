import { extractHighlights } from "../components/notifications/utils";
import { describe, test, expect } from "vitest";

describe("extractHighlights", () => {
  test("should return the text without highlights if there are no highlights", () => {
    const result = extractHighlights("Here is the original text");

    expect(result).toEqual([{ text: "Here is the original text" }]);
  });
  test("should split the text on highlights when there is one", () => {
    const result = extractHighlights("Here is the original text", ["the"]);

    expect(result).toEqual([
      { text: "Here is " },
      { text: "the", high: true },
      { text: " original text" },
    ]);
  });
  test("should split only the first occurrence of text on highlights when there is one", () => {
    const result = extractHighlights("Here is the original bit of the text", [
      "the",
    ]);

    expect(result).toEqual([
      { text: "Here is " },
      { text: "the", high: true },
      { text: " original bit of the text" },
    ]);
  });
  test("should split the text on highlights when there are multiple", () => {
    const result = extractHighlights("Here is the original text", [
      "is",
      "original",
    ]);

    expect(result).toEqual([
      { text: "Here " },
      { text: "is", high: true },
      { text: " the " },
      { text: "original", high: true },
      { text: " text" },
    ]);
  });
  test("should split the text on merged highlights when there are multiple overlapping", () => {
    const result = extractHighlights("Here is the original text", [
      "is the",
      "the original",
    ]);

    expect(result).toEqual([
      { text: "Here " },
      { text: "is the original", high: true },
      { text: " text" },
    ]);
  });
});
