const input = await Deno.readTextFile("input.txt");
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

const startsWithA = Array.from(tree.entries())
  .map(([n]) => n)
  .filter((n) => n.endsWith("A"));

function traverseSteps(curr: string) {
  let steps = 0;
  while (!curr.endsWith("Z")) {
    const [left, right] = tree.get(curr)!;
    instr[steps % instr.length] === "L" ? (curr = left) : (curr = right);
    steps++;
  }
  return steps;
}

// from https://www.geeksforgeeks.org/lcm-of-given-array-elements/
function findLcm(arr: number[]) {
  let ans = arr[0];

  function gcd(a: number, b: number) {
    if (b == 0) return a;
    return gcd(b, a % b);
  }

  for (let i = 1; i < arr.length; i++) {
    ans = (arr[i] * ans) / gcd(arr[i], ans);
  }

  return ans;
}

// I didn't just *naturally* come up with the LCM solution, but it does make
// sense after I got a hint about it from r/adventofcode.
const output = findLcm(startsWithA.map((n) => traverseSteps(n)));

console.log(output);
