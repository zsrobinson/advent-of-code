const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);
const splitLines = lines.map((line) => line.split(","));
const rangeAsNums = splitLines.map((line) =>
  line.map((num) => {
    const [start, end] = num.split("-");
    const range = Number(end) - Number(start);
    const array = Array.from(
      { length: range + 1 },
      (_, i) => Number(start) + i
    );
    return array.map((_, index) => Number(start) + index);
  })
);
const fullyContained = rangeAsNums.map(([firstHalf, secondHalf]) => {
  let firstWithinSecond = true;
  firstHalf.forEach((num) => {
    if (!secondHalf.includes(num)) {
      firstWithinSecond = false;
    }
  });
  let secondWithinFirst = true;
  secondHalf.forEach((num) => {
    if (!firstHalf.includes(num)) {
      secondWithinFirst = false;
    }
  });
  return firstWithinSecond || secondWithinFirst;
});
const sum = fullyContained.filter((bool) => bool).length;
console.log(sum);
