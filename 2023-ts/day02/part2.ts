const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type Subset = { red: number; green: number; blue: number };

const parsed = lines.map((line) => {
  line = line.split(": ")[1];
  const subsets: Subset[] = [];

  for (const subsetStr of line.split("; ")) {
    const subset: Subset = { red: 0, green: 0, blue: 0 };

    for (const colorAndNumber of subsetStr.split(", ")) {
      const color = colorAndNumber.split(" ")[1];
      const number = Number(colorAndNumber.split(" ")[0]);

      if (!(color === "red" || color === "green" || color === "blue"))
        throw new Error("invalid color");

      subset[color] = number;
    }

    subsets.push(subset);
  }

  return subsets;
});

const maxOfEachGame = parsed.map((subsets) => {
  const newSubset: Subset = { red: 0, green: 0, blue: 0 };

  for (const subset of subsets) {
    if (subset.red > newSubset.red) newSubset.red = subset.red;
    if (subset.green > newSubset.green) newSubset.green = subset.green;
    if (subset.blue > newSubset.blue) newSubset.blue = subset.blue;
  }

  return newSubset;
});

const powerOfEachGame = maxOfEachGame.map(
  (subset) => subset.red * subset.green * subset.blue
);

let sumOfPowers = 0;
powerOfEachGame.forEach((power) => {
  sumOfPowers += power;
});

console.log(sumOfPowers);
