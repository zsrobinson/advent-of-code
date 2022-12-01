const input = await Deno.readTextFile("./input.txt");
const output = atob(input);
console.log(output);