const input = await Deno.readTextFile("./input.txt");

const separatedByElf = input.split("\n\n");
const elfArray = separatedByElf.map((elf) => {
  const foodArray = elf.split("\n");
  let sum = 0;
  foodArray.forEach((food) => (sum += parseInt(food)));
  return sum;
});

const sortedElfArray = elfArray
  .slice() // copy the array
  .filter((num) => !isNaN(num)) // for some reason there's a NaN in the array
  .sort((a, b) => b - a); // sort the array in descending order

// lesson learned: typeof NaN === "number"
// not sure how that makes sense...

console.log(sortedElfArray[0] + sortedElfArray[1] + sortedElfArray[2]);
