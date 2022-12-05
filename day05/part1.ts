const input = await Deno.readTextFile("./input.txt");
const [crateText, instructionsText] = input.split("\n\n");

/* const crateText = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `;

const instructionsText = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`; */

const instructionsLines = instructionsText
  .split("\n")
  .filter((line) => line.length > 0);
const numberOfStacks = (crateText.split("\n")[0].length + 1) / 4;
const stacks: string[][] = Array.from({ length: numberOfStacks }, () => []);

for (let i = 0; i < crateText.split("\n").length - 1; i++) {
  const thisLinesText = crateText.split("\n")[i];

  // return an array with the second letter of every group of four letters
  const thisLinesStacks = thisLinesText.match(/.{1,4}/g)?.map((x) => x[1]);

  // add the letter of each stack to it's corresponding array in the stacks array
  thisLinesStacks?.forEach((x, j) => {
    if (x == " ") return;
    stacks[j]?.push(x);
  });
}

const instructions = instructionsLines.map((instruction) => {
  const array = instruction.split(" ");
  const num = parseInt(array[1]);
  const source = parseInt(array[3]);
  const destination = parseInt(array[5]);
  return { num, source, destination };
});

instructions.forEach(({ num, source, destination }) => {
  const sourceStack = stacks[source - 1];
  const destinationStack = stacks[destination - 1];

  for (let i = 0; i < num; i++) {
    const shifted = sourceStack.shift();
    if (shifted) destinationStack.unshift(shifted);
  }
});

const output = stacks.map((stack) => stack[0]).join("");
console.log(output);

// this was painful
