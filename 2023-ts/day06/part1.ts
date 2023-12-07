const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n");

function parseNumList(str: string) {
  return str
    .split(" ")
    .filter((s) => s.length > 0)
    .map((n) => Number(n));
}

const races: { time: number; record: number }[] = [];
const times = parseNumList(lines[0].replace("Time:", ""));
const dists = parseNumList(lines[1].replace("Distance:", ""));
times.forEach((_, i) => races.push({ time: times[i], record: dists[i] }));

const waysToBeat = races.map((race) => {
  // console.log("analyzing race", i);
  let winningRaces = 0;
  for (let heldDown = 0; heldDown < race.time; heldDown++) {
    const dist = race.time * heldDown - heldDown ** 2;
    // console.log("  heldDown", heldDown, "dist", dist);
    if (dist > race.record) winningRaces++;
  }
  return winningRaces;
});

let product = 1;
for (const num of waysToBeat) {
  product *= num;
}

console.log(product);
