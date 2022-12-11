const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

const interestingCycles = [20, 60, 100, 140, 180, 220];
const interestingSignalStrengths: number[] = [];

let cycle = 0;
let xRegister = 1;

for (const line of lines) {
  const [command, value] = line.split(" ");
  if (command === "addx") {
    incrementCycle(2);
    xRegister += Number(value);
  }
  if (command === "noop") {
    incrementCycle(1);
  }
}

function incrementCycle(num: number) {
  for (let i = 0; i < num; i++) {
    cycle++;
    if (interestingCycles.includes(cycle)) {
      interestingSignalStrengths.push(xRegister * cycle);
    }
  }
}

console.log(interestingSignalStrengths.reduce((a, b) => a + b));
