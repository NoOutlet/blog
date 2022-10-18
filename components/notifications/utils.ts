type TextSegment = {
  text: string;
  high?: boolean;
};

export const extractHighlights = (
  text: string,
  highlightText: string[] = []
) => {
  const splitIndices = highlightText
    .map((hlText) => {
      const startIndex = text.toLowerCase().indexOf(hlText);
      return [startIndex, startIndex + hlText.length];
    })
    .sort((a, b) => a[0] - b[0])
    .reduce((acc, indices: number[]) => {
      if (!acc.length || indices[0] > acc[acc.length - 1][1]) {
        acc.push(indices);
      } else {
        acc[acc.length - 1][1] = Math.max(acc[acc.length - 1][1], indices[1]);
      }
      return acc;
    }, [] as Array<number>[]);

  let lastIndex = 0;
  const extractedText: TextSegment[] = splitIndices.reduce(
    (textSegments, split) => {
      textSegments.push({ text: text.slice(lastIndex, split[0]) });
      textSegments.push({ text: text.slice(split[0], split[1]), high: true });
      lastIndex = split[1];
      return textSegments;
    },
    [] as TextSegment[]
  );
  extractedText.push({ text: text.slice(lastIndex) });

  return extractedText;
};
