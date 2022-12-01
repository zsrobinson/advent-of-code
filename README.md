# Advent of Code 2022

My first attempt at the [Advent of Code](https://adventofcode.com/), written in TypeScript. This might not be the most *elegant* code in the world, but it seems like the goal of this challenge is to prioritize speed over the theoretical best possible solution. 

To run the code, `cd` into that day's directory and execute `deno run --allow-read [file].ts`. The `--watch` flag can also be added to automatically run the code on save.

**Boilerplate:**
```ts
const input = await Deno.readTextFile("./input.txt");
```