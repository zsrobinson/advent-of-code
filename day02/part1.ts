const input = await Deno.readTextFile("./input.txt");
const rounds = input.split("\n").filter((line) => line.length > 0);
// const rounds = lines.map((line) => line.split(" "));

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors

// (1 for Rock, 2 for Paper, and 3 for Scissors)
// (0 if you lost, 3 if the round was a draw, and 6 if you won)

const scores = rounds.map((round) => {
  // score for the shape you selected
  let shape = 0;
  if (round.includes("X")) shape = 1;
  else if (round.includes("Y")) shape = 2;
  else if (round.includes("Z")) shape = 3;

  // score for outcome of the round
  let outcome = 0;
  if (round === "A Z" || round === "B X" || round === "C Y") outcome = 0;
  else if (round === "A X" || round === "B Y" || round === "C Z") outcome = 3;
  else if (round === "A Y" || round === "B Z" || round === "C X") outcome = 6;

  return shape + outcome;
});

const sum = scores.reduce((a, b) => a + b);

console.log(sum);
