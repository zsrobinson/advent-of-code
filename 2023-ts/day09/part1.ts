const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

function predict(seq: number[]): number {
  if (seq.every((n) => n == 0)) {
    return 0;
  }

  const diff: number[] = [];
  for (let i = 0; i < seq.length - 1; i++) {
    diff.push(seq[i + 1] - seq[i]);
  }

  const next = predict(diff);
  return next + seq[seq.length - 1];
}

let sum = 0;
for (const line of lines) {
  const seq = line.split(" ").map((n) => Number(n));
  sum += predict(seq);
}

console.log(sum);
