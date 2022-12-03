const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

// all I really had to do was swap out the logic of this step
const elfGroups = [];
for (let i = 0; i < lines.length / 3; i++) {
  const group = [];
  group.push(lines[i * 3]);
  group.push(lines[i * 3 + 1]);
  group.push(lines[i * 3 + 2]);
  elfGroups.push(group);
}

// this step could have been generalized to any number of elves
const commonLetters = elfGroups.map(([elfOne, elfTwo, elfThree]) => {
  let commonLetter = "";
  Array.from(elfOne).forEach((letter) => {
    if (elfTwo.includes(letter) && elfThree.includes(letter)) {
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
