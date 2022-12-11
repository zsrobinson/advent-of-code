const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type pos = { x: number; y: number };
const tailStates: pos[] = [{ x: 0, y: 0 }];
const headStates: pos[] = [{ x: 0, y: 0 }];

function withinOne(num1: number, num2: number) {
  return Math.abs(num1 - num2) <= 1;
}

for (const line of lines) {
  const [direction, distance] = line.split(" ");

  // for each move in a set of moves
  for (let i = 0; i < parseInt(distance); i++) {
    const newHead = { ...headStates[0] };

    if (direction === "R") newHead.x++;
    else if (direction === "L") newHead.x--;
    else if (direction === "U") newHead.y++;
    else if (direction === "D") newHead.y--;

    headStates.unshift(newHead);

    if (
      withinOne(newHead.x, tailStates[0].x) &&
      withinOne(newHead.y, tailStates[0].y)
    )
      continue;

    tailStates.unshift({ ...headStates[1] });
  }
}
const tailStatesStrings = tailStates.map((state) => JSON.stringify(state));
console.log([...new Set(tailStatesStrings)].length);
