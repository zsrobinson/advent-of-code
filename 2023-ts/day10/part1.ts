const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type Node = { x: number; y: number };
type Adj = { n: boolean; e: boolean; s: boolean; w: boolean };

const pipes = new Map<string, Adj>();
let start: Node | undefined = undefined;

function pipeAdjs(pipe: string): Adj {
  if (pipe == "|") {
    return { n: true, e: false, s: true, w: false };
  } else if (pipe == "-") {
    return { n: false, e: true, s: false, w: true };
  } else if (pipe == "L") {
    return { n: true, e: true, s: false, w: false };
  } else if (pipe == "J") {
    return { n: true, e: false, s: false, w: true };
  } else if (pipe == "7") {
    return { n: false, e: false, s: true, w: true };
  } else if (pipe == "F") {
    return { n: false, e: true, s: true, w: false };
  } else if (pipe == ".") {
    return { n: false, e: false, s: false, w: false };
  } else if (pipe == "S") {
    return { n: true, e: true, s: true, w: true };
  } else {
    throw new Error("unknown pipe character");
  }
}

for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[0].length; j++) {
    const node: Node = { x: j, y: i };
    if (lines[i][j] == "S") start = node;
    pipes.set(JSON.stringify(node), pipeAdjs(lines[i][j]));
  }
}

if (!start) throw new Error("no starting found");

const visited = new Set<string>();
const queue: Node[] = [];
queue.push(start);

while (queue.length != 0) {
  const next = queue.shift()!;
}
