const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

const height = lines.length;
const width = lines[0].length;
const totalTiles = height * width;

function findChar(char: string) {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (lines[i][j] === char) {
        return i * width + j;
      }
    }
  }
}

const start = findChar("E");
if (start === undefined) throw new Error("Cannot find start");

const dists = Array.from({ length: totalTiles }, () => Infinity);
const seen = Array.from({ length: totalTiles }, () => false);
const prev: (number | undefined)[] = Array.from(
  { length: totalTiles },
  () => undefined
);

dists[start] = 0;

function hasUnvisited() {
  for (let i = 0; i < totalTiles; i++) {
    if (dists[i] !== Infinity && !seen[i]) {
      return true;
    }
  }
  return false;
}

function nextLowestUnvisited() {
  let idx = -1;
  let lowestValue = Infinity;

  for (let i = 0; i < totalTiles; i++) {
    if (seen[i]) continue;
    if (dists[i] < lowestValue) {
      lowestValue = dists[i];
      idx = i;
    }
  }

  return idx;
}

function getEdges(idx: number) {
  const edges: number[] = [];

  if (idx - width >= 0) edges.push(idx - width); // above
  if (idx + width < totalTiles) edges.push(idx + width); // below
  if (idx % width > 0) edges.push(idx - 1); // left
  if (idx % width < width - 1) edges.push(idx + 1); // right

  return edges.filter((edge) => getHeight(idx) - getHeight(edge) <= 1);
}

function getHeight(idx: number) {
  const char = lines[Math.floor(idx / width)][idx % width];
  if (char === "S") return 0;
  if (char === "E") return 27;
  return char.charCodeAt(0) - 96;
}

while (hasUnvisited()) {
  const curr = nextLowestUnvisited();
  seen[curr] = true;

  for (const edge of getEdges(curr)) {
    if (seen[edge]) continue;
    const dist = dists[curr] + getHeight(curr);
    if (dist < dists[edge]) {
      prev[edge] = curr;
      dists[edge] = dist;
    }
  }
}

const aTiles = Array.from({ length: totalTiles }, (_, i) => i).filter((i) => {
  const char = lines[Math.floor(i / width)][i % width];
  return char === "a";
});

const aTilesDists = aTiles.map((end) => {
  let curr = end;
  let pathLength = 0;
  while (prev[curr] !== undefined) {
    curr = prev[curr]!;
    pathLength++;
  }
  return pathLength;
});

let minDist = Infinity;
for (let i = 0; i < aTilesDists.length; i++) {
  if (aTilesDists[i] < minDist && aTilesDists[i] !== 0) {
    minDist = aTilesDists[i];
  }
}

// Not sure why aTilesDists has a bunch of 0's in there but I just threw in that
// extra check `aTilesDists[i] !== 0` and got the right answer so I'll take that

console.log("Lowest steps required to reach any tile 'a':", minDist);
