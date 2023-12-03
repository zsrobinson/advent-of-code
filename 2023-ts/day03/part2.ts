const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

type Point = { x: number; y: number };

const width = lines[0].length;
const height = lines.length;

function isGear(char: string) {
  if (char.length !== 1) throw new Error("char is not length of 1");
  return char === "*";
}

function getAdjacentGearToPart({ x, y }: Point, length: number) {
  for (let i = 0; i < length; i++) {
    const adjacentGear = getAdjacentGearToPoint({ x: x + i, y });
    if (adjacentGear !== undefined) return adjacentGear;
  }
  return undefined;
}

function getAdjacentGearToPoint({ x, y }: Point) {
  const isAbove = y > 0;
  const isBelow = y < height - 1;
  const isToLeft = x > 0;
  const isToRight = x < width - 1;

  if (isAbove && isGear(lines[y - 1][x])) return { x, y: y - 1 };
  if (isAbove && isToRight && isGear(lines[y - 1][x + 1]))
    return { x: x + 1, y: y - 1 };
  if (isToRight && isGear(lines[y][x + 1])) return { x: x + 1, y };
  if (isToRight && isBelow && isGear(lines[y + 1][x + 1]))
    return { x: x + 1, y: y + 1 };
  if (isBelow && isGear(lines[y + 1][x])) return { x, y: y + 1 };
  if (isBelow && isToLeft && isGear(lines[y + 1][x - 1]))
    return { x: x - 1, y: y + 1 };
  if (isToLeft && isGear(lines[y][x - 1])) return { x: x - 1, y };
  if (isToLeft && isAbove && isGear(lines[y - 1][x - 1]))
    return { x: x - 1, y: y - 1 };

  return undefined;
}

/**
 * Have to convert points to strings before putting them into the map because
 * otherwise the map won't view two "equal" objects as actually equal. Or in
 * other words, js doesn't let you make a .equals() method for objects so maps
 * don't work as expected for custom object keys.
 */
function pointToString(point: Point) {
  return `{x: ${point.x}, y: ${point.y}}`;
}

const gearMap = new Map<string, number[]>();

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
      const adjacentGear = getAdjacentGearToPart({ x: x - digits, y }, digits);

      if (adjacentGear !== undefined) {
        const gearExists = gearMap.get(pointToString(adjacentGear));
        if (gearExists !== undefined) {
          gearMap.set(pointToString(adjacentGear), [
            ...gearExists,
            currentPartNumber,
          ]);
        } else {
          gearMap.set(pointToString(adjacentGear), [currentPartNumber]);
        }
      }

      currentPartNumber = undefined;
    }
  }

  // check again at the end of the line
  if (currentPartNumber !== undefined) {
    const digits = currentPartNumber.toString().length;
    const adjacentGear = getAdjacentGearToPart(
      { x: width - 1 - digits, y },
      digits
    );

    if (adjacentGear !== undefined) {
      const gearExists = gearMap.get(pointToString(adjacentGear));
      if (gearExists !== undefined) {
        gearMap.set(pointToString(adjacentGear), [
          ...gearExists,
          currentPartNumber,
        ]);
      } else {
        gearMap.set(pointToString(adjacentGear), [currentPartNumber]);
      }
    }
  }
}

let gearRatioSum = 0;
gearMap.forEach((parts) => {
  if (parts.length == 2) {
    gearRatioSum += parts[0] * parts[1];
  }
});

console.log(gearRatioSum);
