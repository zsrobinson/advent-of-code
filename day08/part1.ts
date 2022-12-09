const input = await Deno.readTextFile("./input.txt");
const treesGrid = input
  .split("\n")
  .filter((str) => str.length > 0)
  .map((row) => row.split(""));

let visibleTrees = 0;

for (let i = 0; i < treesGrid.length; i++) {
  for (let j = 0; j < treesGrid[i].length; j++) {
    const thisTree = parseInt(treesGrid[i][j]);

    // Check trees above
    const aboveTrees: number[] = [];
    treesGrid.forEach((row, x) => {
      if (x < i) aboveTrees.push(parseInt(row[j]));
    });
    if (aboveTrees.every((tree) => tree < thisTree)) {
      visibleTrees++;
      continue;
    }

    // Check trees below
    const belowTrees: number[] = [];
    treesGrid.forEach((row, x) => {
      if (x > i) belowTrees.push(parseInt(row[j]));
    });
    if (belowTrees.every((tree) => tree < thisTree)) {
      visibleTrees++;
      continue;
    }

    // Check trees left
    const leftTrees: number[] = [];
    treesGrid[i].forEach((tree, x) => {
      if (x < j) leftTrees.push(parseInt(tree));
    });
    if (leftTrees.every((tree) => tree < thisTree)) {
      visibleTrees++;
      continue;
    }

    // Check trees right
    const rightTrees: number[] = [];
    treesGrid[i].forEach((tree, x) => {
      if (x > j) rightTrees.push(parseInt(tree));
    });
    if (rightTrees.every((tree) => tree < thisTree)) {
      visibleTrees++;
      continue;
    }
  }
}

console.log(visibleTrees);
