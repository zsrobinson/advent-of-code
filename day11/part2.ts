const input = await Deno.readTextFile("./input.txt");
const monkeyData = input
  .split("\n\n")
  .filter((line) => line.length > 0)
  .map((monkey) => monkey.split("\n"))
  .map((monkey) => {
    const [_monkeyName, startingItems, operation, test, ifTrue, ifFalse] =
      monkey;
    return {
      items: startingItems.split(": ")[1].split(", ").map(Number),
      operation: operation.split(": ")[1].split(" = ")[1],
      test: Number(test.split(": ")[1].split(" ")[2]),
      ifTrue: Number(ifTrue.split(": ")[1].split(" ")[3]),
      ifFalse: Number(ifFalse.split(": ")[1].split(" ")[3]),
      itemsInspected: 0,
    };
  });

// In the interest of transparency, I wasn't able to come up with the "other
// way to keep [my] worry levels manageable" on my own. Modulo arithmetic isn't
// exactly something I come across on a day-to-day basis...

const GCD = monkeyData.reduce((acc, monkey) => acc * monkey.test, 1);

const ROUNDS = 10000;
for (let i = 0; i < ROUNDS; i++) {
  for (const monkey of monkeyData) {
    monkey.items = monkey.items.map((old) => eval(monkey.operation));
    monkey.items = monkey.items.map((old) => old % GCD);

    monkey.items.forEach((item) => {
      if (item % monkey.test === 0) {
        monkeyData[monkey.ifTrue].items.push(item);
      } else {
        monkeyData[monkey.ifFalse].items.push(item);
      }
      monkey.itemsInspected++;
    });

    monkey.items = [];
  }
}

const inspectedArray = monkeyData.map((monkey) => monkey.itemsInspected);
inspectedArray.sort((a, b) => b - a);

console.log(inspectedArray[0] * inspectedArray[1]);
