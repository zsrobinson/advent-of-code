const input = await Deno.readTextFile("./input.txt");
const treesGrid = input
  .split("\n")
  .filter((str) => str.length > 0)
  .map((row) => row.split(""));

function getDirectionScore(trees: number[], thisTree: number) {
  let score = 0;
  for (const tree of trees) {
    if (tree < thisTree) {
      score++;
    } else {
      score++;
      break;
    }
  }
  return score;
}

const visibleScores: number[] = [];

for (let i = 0; i < treesGrid.length; i++) {
  for (let j = 0; j < treesGrid[i].length; j++) {
    const thisTree = parseInt(treesGrid[i][j]);

    // Check trees above
    const aboveTrees: number[] = [];
    treesGrid.forEach((row, x) => {
      if (x < i) aboveTrees.push(parseInt(row[j]));
    });
    aboveTrees.reverse();
    const aboveTreesScore = getDirectionScore(aboveTrees, thisTree);

    // Check trees right
    const rightTrees: number[] = [];
    treesGrid[i].forEach((tree, x) => {
      if (x > j) rightTrees.push(parseInt(tree));
    });
    const rightTreesScore = getDirectionScore(rightTrees, thisTree);

    // Check trees below
    const belowTrees: number[] = [];
    treesGrid.forEach((row, x) => {
      if (x > i) belowTrees.push(parseInt(row[j]));
    });
    const belowTreesScore = getDirectionScore(belowTrees, thisTree);

    // Check trees left
    const leftTrees: number[] = [];
    treesGrid[i].forEach((tree, x) => {
      if (x < j) leftTrees.push(parseInt(tree));
    });
    leftTrees.reverse();
    const leftTreesScore = getDirectionScore(leftTrees, thisTree);

    visibleScores.push(
      aboveTreesScore * rightTreesScore * belowTreesScore * leftTreesScore
    );
  }
}

console.log(Math.max(...visibleScores));
