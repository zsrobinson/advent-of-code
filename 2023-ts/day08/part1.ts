const input = await Deno.readTextFile("demo3.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type Children = [string, string];
const tree = new Map<string, Children>();
const instr = lines[0];

for (let i = 1; i < lines.length; i++) {
  let [value, other] = lines[i].split(" = ");
  other = other.replace("(", "").replace(")", "");
  const [left, right] = other.split(", ");
  tree.set(value, [left, right]);
}

let curr = "AAA";
let steps = 0;

while (curr != "ZZZ") {
  const [left, right] = tree.get(curr)!;
  instr[steps % instr.length] === "L" ? (curr = left) : (curr = right);
  steps++;
}

console.log(steps);
