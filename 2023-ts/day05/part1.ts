const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n\n").map((block) => block.split("\n"));

type ConversionMap = number[][];
function parseMap(i: number): ConversionMap {
  return lines[i].slice(1).map((line) => line.split(" ").map((n) => Number(n)));
}

const seeds = lines[0][0]
  .replace("seeds: ", "")
  .split(" ")
  .map((n) => Number(n));

const seedToSoilMap = parseMap(1);
const soilToFertMap = parseMap(2);
const fertToWaterMap = parseMap(3);
const waterToLightMap = parseMap(4);
const lightToTempMap = parseMap(5);
const tempToHumidMap = parseMap(6);
const humidToLocMap = parseMap(7);

function convert(input: number, map: ConversionMap) {
  let index: number | undefined = undefined;
  console.log("converting", input);

  for (let i = 0; i < map.length; i++) {
    if (input >= map[i][1] && input < map[i][1] + map[i][2]) {
      index = i;
      break;
    }
  }

  console.log("converting with rule", index);

  // if a rule is not defined, then it's the same number
  if (index === undefined) return input;
  return input - map[index][1] + map[index][0];
}

const locations = seeds.map((seed) => {
  const soil = convert(seed, seedToSoilMap);
  const fert = convert(soil, soilToFertMap);
  const water = convert(fert, fertToWaterMap);
  const light = convert(water, waterToLightMap);
  const temp = convert(light, lightToTempMap);
  const humid = convert(temp, tempToHumidMap);
  return convert(humid, humidToLocMap);
});

let min: number | undefined = undefined;
for (const location of locations) {
  if (min === undefined || location < min) min = location;
}

console.log(min);
