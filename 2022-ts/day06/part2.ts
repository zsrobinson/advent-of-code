const input = await Deno.readTextFile("./input.txt");

let startOfPacketIndex = 0;

const markerLength = 14;

for (let i = markerLength - 1; i < input.length; i++) {
  const set = new Set();

  for (let j = 0; j < markerLength; j++) {
    set.add(input[i - j]);
  }

  if (set.size === markerLength) {
    startOfPacketIndex = i + 1;
    break;
  }
}

console.log(startOfPacketIndex);
