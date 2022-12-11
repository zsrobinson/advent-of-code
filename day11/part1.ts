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
      test: test.split(": ")[1],
      ifTrue: Number(ifTrue.split(": ")[1].split(" ")[3]),
      ifFalse: Number(ifFalse.split(": ")[1].split(" ")[3]),
      itemsInspected: 0,
    };
  });

const ROUNDS = 20;
for (let i = 0; i < ROUNDS; i++) {
  for (const monkey of monkeyData) {
    monkey.items = monkey.items.map((old) => eval(monkey.operation));
    monkey.items = monkey.items.map((old) => Math.floor(old / 3));

    monkey.items.forEach((item) => {
      if (item % Number(monkey.test.split(" ")[2]) === 0) {
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
