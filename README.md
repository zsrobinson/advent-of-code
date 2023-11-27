# Advent of Code

A collection of my attempts at the various [advent of codes](https://adventofcode.com/) over the years. As a fair warning, I doubt that this will be the most elegant code in the world given that the goal is to generally prioritize speed.

Each folder in this repository is the year of that challenge, along with the language I used for that set of solutions. For example, my first year doing this was 2022 and I used Typescript, so that folder's name is `2022-ts`. Inside each of these folders, there's an additional folder for each day which contains the input text and the solution for part one and two.

## Project Setups

- 2022: Typescript, [Deno](https://deno.com/) runtime
  - run the file: `deno run --allow-read [file].ts`
  - run the file and watch for changes: `deno run --allow-read --watch [file].ts`
  - read file input: `const input = await Deno.readTextFile("./input.txt");`
