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
const overlap = rangeAsNums.map(([firstHalf, secondHalf]) => {
  let doesOverlap = false;
  firstHalf.forEach((num) => {
    if (secondHalf.includes(num)) {
      doesOverlap = true;
    }
  });
  return doesOverlap;
});
const sum = overlap.filter((bool) => bool).length;
console.log(sum);
