const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n").filter((line) => line.length > 0);

function getCardValue(str: string) {
  if (str == "A") return 14;
  if (str == "K") return 13;
  if (str == "Q") return 12;
  if (str == "J") return 11;
  if (str == "T") return 10;
  return Number(str);
}

function getHandValue(str: string) {
  let value = 0;
  for (let i = 0; i < str.length; i++) {
    value *= 14; // higher significance to the first cards
    value += getCardValue(str[i]);
  }
  return value;
}

function handToMap(hand: string): Map<string, number> {
  const map = new Map<string, number>();
  for (const char of hand) {
    const curr = map.get(char);
    curr === undefined ? map.set(char, 1) : map.set(char, curr + 1);
  }
  return map;
}

function getHandResult(hand: string) {
  const map = handToMap(hand);
  const values = Array.from(map.values());

  if (map.size == 1) return 7; // five of a kind
  if (values.includes(4) && values.includes(1)) return 6; // four of a kind
  if (map.size == 2) return 5; // full house
  if (values.includes(3) && values.includes(1)) return 4; // three of a kind
  if (values.filter((x) => x === 2).length === 2) return 3; // two pair
  if (values.includes(2)) return 2; // one pair
  return 1;
}

const hands = lines.map((line) => {
  const [hand, bid] = line.split(" ");
  return { hand, bid: Number(bid) };
});

hands.sort((a, b) => {
  let compare = getHandResult(a.hand) - getHandResult(b.hand);
  if (compare == 0) compare = getHandValue(a.hand) - getHandValue(b.hand);
  return compare;
});

let winnings = 0;
hands.forEach((hand, i) => {
  winnings += hand.bid * (i + 1);
});

console.log(winnings);
