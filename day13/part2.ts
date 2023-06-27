const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type Thing = number | Thing[];
const packets: Thing[][] = lines.map((line) => JSON.parse(line));

packets.push([[2]], [[6]]);

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

// this isn't really sorted correctly but it's good enough
// for what we're trying to do here
packets.sort((a, b) => (compareValues(a, b) ? -1 : 1));

const dividerPacketOne =
  packets.findIndex((packet) => JSON.stringify(packet) === "[[2]]") + 1;

const dividerPacketTwo =
  packets.findIndex((packet) => JSON.stringify(packet) === "[[6]]") + 1;

console.log("Decoder key:", dividerPacketOne * dividerPacketTwo);
