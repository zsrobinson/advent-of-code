const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

function parseStr(list: string) {
  return list
    .split(" ")
    .filter((str) => str.length > 0)
    .map((str) => Number(str));
}

const cards = lines.map((line) => {
  const [winningStr, actualStr] = line.split(": ")[1].split(" | ");
  return { winning: parseStr(winningStr), actual: parseStr(actualStr) };
});

let pointSum = 0;
for (const card of cards) {
  let cardSum = 0;

  for (const num of card.actual) {
    if (card.winning.includes(num)) {
      if (cardSum == 0) {
        cardSum++; // add one for first card
      } else {
        cardSum *= 2; // double for each one after that
      }
    }
  }
  pointSum += cardSum;
}

console.log(pointSum);
