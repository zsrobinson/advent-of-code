const input = await Deno.readTextFile("./input.txt");

const separatedByElf = input.split("\n\n");
const elfArray = separatedByElf.map((elf) => {
  const foodArray = elf.split("\n");
  let sum = 0;
  foodArray.forEach((food) => (sum += parseInt(food)));
  return sum;
});

let mostCals = 0;
let mostCalsIndex = 0;
elfArray.forEach((elf, i) => {
  if (elf > mostCals) {
    mostCals = elf;
    mostCalsIndex = i;
  }
});

console.log("mostCals", mostCals);
console.log("mostCalsIndex", mostCalsIndex);
