const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

const values = lines.map((line, i) => {
  let firstDigit: number | null = null;
  let lastDigit: number | null = null;

  for (const char of line) {
    if (isNaN(Number(char))) continue; // ignore if not a number
    if (firstDigit === null) firstDigit = Number(char);
    lastDigit = Number(char);
  }

  if (firstDigit === null || lastDigit === null)
    throw new Error("null digits " + i);

  return firstDigit * 10 + lastDigit;
});

let sum = 0;
for (const value of values) {
  sum += value;
}

console.log(sum);
