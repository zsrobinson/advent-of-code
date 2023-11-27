const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

const splitLines = lines.map((line) => [
  line.slice(0, line.length / 2), // first half
  line.slice(line.length / 2), // second half
]);

const commonLetters = splitLines.map(([firstHalf, secondHalf]) => {
  let commonLetter = "";
  Array.from(firstHalf).forEach((letter) => {
    if (secondHalf.includes(letter)) {
      commonLetter = letter;
    }
  });
  return commonLetter;
});

const commonLetterScores = commonLetters.map((letter) => {
  let letterScore = 0;
  if (letter.toLowerCase() === letter) {
    letterScore = letter.charCodeAt(0) - 96;
  } else {
    letterScore = letter.charCodeAt(0) - 38;
  }
  return letterScore;
});

const sum = commonLetterScores.reduce((a, b) => a + b);
console.log(sum);
