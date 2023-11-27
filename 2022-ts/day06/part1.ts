const input = await Deno.readTextFile("./input.txt");

let startOfPacketIndex = 0;

for (let i = 3; i < input.length; i++) {
  const set = new Set();
  set.add(input[i - 3]);
  set.add(input[i - 2]);
  set.add(input[i - 1]);
  set.add(input[i]);

  if (set.size === 4) {
    startOfPacketIndex = i + 1;
    break;
  }
}

console.log(startOfPacketIndex);
