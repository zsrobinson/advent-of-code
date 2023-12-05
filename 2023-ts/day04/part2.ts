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

const winningNums = cards.map((card) => {
  let cardSum = 0;

  for (const num of card.actual) {
    if (card.winning.includes(num)) {
      cardSum++;
    }
  }

  return cardSum;
});

// doing dynamic programming or something, idk I watched some yt video abt it
const memo: number[] = [];
for (let i = winningNums.length - 1; i >= 0; i--) {
  memo[i] = 1;

  for (let j = 1; j <= winningNums[i]; j++) {
    memo[i] += memo[i + j];
  }
}

let sum = 0;
for (let i = 0; i < memo.length; i++) {
  sum += memo[i];
}

console.log(sum);
