const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

const screen = Array.from({ length: 6 }, () => "");

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
    if (
      cycle % 40 === xRegister ||
      cycle % 40 === xRegister + 1 ||
      cycle % 40 === xRegister - 1
    ) {
      screen[Math.floor(cycle / 40)] += "#";
    } else {
      screen[Math.floor(cycle / 40)] += ".";
    }
    cycle++;
  }
}

screen.forEach((line) => console.log(line));
