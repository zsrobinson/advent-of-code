const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type Point = { x: number; y: number };

const width = lines[0].length;
const height = lines.length;

function isSymbol(char: string) {
  if (char.length !== 1) throw new Error("char is not length of 1");
  const isNum = !isNaN(Number(char));
  const isPeriod = char === ".";
  return !isNum && !isPeriod;
}

function arePointsAdjacent({ x, y }: Point, length: number) {
  for (let i = 0; i < length; i++) {
    if (isPointAdjacent({ x: x + i, y })) return true;
  }
  return false;
}

function isPointAdjacent({ x, y }: Point): boolean {
  const isAbove = y > 0;
  const isBelow = y < height - 1;
  const isToLeft = x > 0;
  const isToRight = x < width - 1;

  if (isAbove && isSymbol(lines[y - 1][x])) return true;
  if (isAbove && isToRight && isSymbol(lines[y - 1][x + 1])) return true;
  if (isToRight && isSymbol(lines[y][x + 1])) return true;
  if (isToRight && isBelow && isSymbol(lines[y + 1][x + 1])) return true;
  if (isBelow && isSymbol(lines[y + 1][x])) return true;
  if (isBelow && isToLeft && isSymbol(lines[y + 1][x - 1])) return true;
  if (isToLeft && isSymbol(lines[y][x - 1])) return true;
  if (isToLeft && isAbove && isSymbol(lines[y - 1][x - 1])) return true;

  return false;
}

let sum = 0;

for (let y = 0; y < height; y++) {
  let currentPartNumber: number | undefined = undefined;

  for (let x = 0; x < width; x++) {
    if (!isNaN(Number(lines[y][x]))) {
      if (currentPartNumber === undefined) {
        currentPartNumber = Number(lines[y][x]);
      } else {
        currentPartNumber *= 10;
        currentPartNumber += Number(lines[y][x]);
      }
    } else if (currentPartNumber !== undefined) {
      // we now have a finished part number

      const digits = currentPartNumber.toString().length;
      if (arePointsAdjacent({ x: x - digits, y }, digits)) {
        sum += currentPartNumber;
      }

      currentPartNumber = undefined;
    }
  }

  // check again at the end of the line
  if (currentPartNumber !== undefined) {
    const digits = currentPartNumber.toString().length;
    if (arePointsAdjacent({ x: width - 1 - digits, y }, digits)) {
      sum += currentPartNumber;
    }

    currentPartNumber = undefined;
  }
}

console.log(sum);
