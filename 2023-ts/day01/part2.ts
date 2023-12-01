const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

function replaceWordsWithDigits(line: string) {
  line = line.replaceAll("one", "1");
  line = line.replaceAll("two", "2");
  line = line.replaceAll("three", "3");
  line = line.replaceAll("four", "4");
  line = line.replaceAll("five", "5");
  line = line.replaceAll("six", "6");
  line = line.replaceAll("seven", "7");
  line = line.replaceAll("eight", "8");
  line = line.replaceAll("nine", "9");
  return line;
}

const values = lines.map((line, i) => {
  let firstDigit: number | null = null;
  let lastDigit: number | null = null;

  let replacedFromFront = "";
  let replacedFromBack = "";

  // STEP ONE: determine the first digit, replace words with digits from front

  for (let i = 0; i < line.length; i++) {
    replacedFromFront = replaceWordsWithDigits(replacedFromFront);
    replacedFromFront += line[i];
  }

  for (const char of replacedFromFront) {
    if (isNaN(Number(char))) continue; // ignore if not a number
    if (firstDigit === null) {
      firstDigit = Number(char);
      break;
    }
  }

  // STEP TWO: determine the last digit, replace words with digits from back

  for (let i = line.length - 1; i >= 0; i--) {
    replacedFromBack = replaceWordsWithDigits(replacedFromBack);
    replacedFromBack = line[i] + replacedFromBack;
  }

  for (const char of replacedFromBack) {
    if (isNaN(Number(char))) continue; // ignore if not a number
    lastDigit = Number(char);
  }

  // finally return the values, but throw error if unable to find digits

  if (firstDigit === null || lastDigit === null)
    throw new Error("null digits " + i);

  return firstDigit * 10 + lastDigit; // combine the digits
});

let sum = 0;
for (const value of values) {
  sum += value;
}

console.log(sum);
