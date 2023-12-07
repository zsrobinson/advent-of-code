const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

const parse = (str: string) => Number(str.split(":")[1].split(" ").join(""));
const time = parse(lines[0]);
const record = parse(lines[1]);

let winningRaces = 0;
for (let heldDown = 0; heldDown < time; heldDown++) {
  const dist = time * heldDown - heldDown ** 2;
  if (dist > record) winningRaces++;
}

console.log(winningRaces);
