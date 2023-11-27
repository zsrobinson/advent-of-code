const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

const LENGTH = 10;
type pos = { x: number; y: number };
const states: pos[][] = Array.from({ length: LENGTH }, () => [{ x: 0, y: 0 }]);

function withinOne(num1: number, num2: number) {
  return Math.abs(num1 - num2) <= 1;
}

for (const line of lines) {
  const [direction, distance] = line.split(" ");

  // for each move in a set of moves
  for (let i = 0; i < parseInt(distance); i++) {
    const newHead = { ...states[0][0] };

    if (direction === "R") newHead.x++;
    else if (direction === "L") newHead.x--;
    else if (direction === "U") newHead.y++;
    else if (direction === "D") newHead.y--;

    states[0].unshift(newHead);

    for (let j = 1; j < states.length; j++) {
      if (
        withinOne(states[j - 1][0].x, states[j][0].x) &&
        withinOne(states[j - 1][0].y, states[j][0].y)
      )
        continue;

      const newSegment = { ...states[j][0] };

      // check for diagonal
      if (
        states[j][0].x !== states[j - 1][0].x &&
        states[j][0].y !== states[j - 1][0].y
      ) {
        if (states[j - 1][0].x > states[j][0].x) newSegment.x++;
        else newSegment.x--;

        if (states[j - 1][0].y > states[j][0].y) newSegment.y++;
        else newSegment.y--;

        states[j].unshift(newSegment);
      } else if (states[j][0].y == states[j - 1][0].y) {
        states[j].unshift({ x: states[j - 1][1].x, y: states[j - 1][0].y });
      } else if (states[j][0].x == states[j - 1][0].x) {
        states[j].unshift({ x: states[j - 1][0].x, y: states[j - 1][1].y });
      }
    }
  }
}

/* function drawState() {
  const lines: string[] = [];
  for (let y = -5; y < 16; y++) {
    let line = "";
    for (let x = -11; x < 15; x++) {
      let char = ".";
      if (x == 0 && y == 0) char = "S";
      for (let i = states.length - 1; i >= 0; i--) {
        if (states[i][0].x == x && states[i][0].y == y) {
          if (i == 0) char = "H";
          else char = String(i);
        }
      }
      line += char;
    }
    lines.unshift(line);
  }
  console.log(lines.join("\n"));
  console.log("");
} */

const tailStatesStrings = states.at(-1)!.map((state) => JSON.stringify(state));
console.log([...new Set(tailStatesStrings)].length);
