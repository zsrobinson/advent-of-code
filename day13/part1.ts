const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

type Thing = number | Thing[];
const pairs: [Thing[], Thing[]][] = [];

for (let i = 0; i < Math.floor(lines.length / 3); i++) {
  pairs.push([
    JSON.parse(lines[i * 3]) as Thing[],
    JSON.parse(lines[i * 3 + 1]) as Thing[],
  ]);
}

function compareValues(left: Thing, right: Thing): boolean {
  if (typeof left === "number" && typeof right === "number") {
    if (left > right) return false;
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      if (
        typeof left[i] === "number" &&
        typeof right[i] === "number" &&
        left[i] === right[i]
      ) {
        continue;
      }

      return compareValues(left[i], right[i]);
    }

    if (left.length - right.length > 0) return false;
  }

  if (Array.isArray(left) && typeof right === "number") {
    const newRight = [right];
    if (!compareValues(left, newRight)) return false;
  }

  if (typeof left === "number" && Array.isArray(right)) {
    const newLeft = [left];
    if (!compareValues(newLeft, right)) return false;
  }

  return true;
}

const correctPairs = pairs.map((pair) => {
  return compareValues(...pair);
});

let sum = 0;
correctPairs.forEach((correct, i) => {
  if (correct) {
    sum += i + 1;
  }
});

console.log("Sum of correct indices", sum);
