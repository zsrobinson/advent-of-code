use std::{collections::HashMap, fs};

fn main() {
    match part1() {
        Some(result) => println!("part1: {}", result),
        None => println!("part1: unimplemented"),
    }

    match part2() {
        Some(result) => println!("part2: {}", result),
        None => println!("part2: unimplemented"),
    }
}

fn part1() -> Option<String> {
    let file: String = fs::read_to_string("./input.txt").unwrap();
    let lines = file.lines().collect::<Vec<_>>();

    let mut first: Vec<i32> = Vec::new();
    let mut second: Vec<i32> = Vec::new();

    for line in lines {
        let mut parts = line.split_whitespace();
        first.push(parts.next().unwrap().parse().unwrap());
        second.push(parts.next().unwrap().parse().unwrap());
    }

    first.sort();
    second.sort();

    let mut total_dist = 0;

    // turn first into distance vector, second vector useless
    for (a, b) in first.iter().zip(second.iter()) {
        total_dist += (*a - *b).abs();
    }

    Some(total_dist.to_string())
}

fn part2() -> Option<String> {
    let file: String = fs::read_to_string("./input.txt").unwrap();
    let lines = file.lines().collect::<Vec<_>>();

    let mut first: Vec<i32> = Vec::new();
    let mut second: Vec<i32> = Vec::new();

    for line in lines {
        let mut parts = line.split_whitespace();
        first.push(parts.next().unwrap().parse().unwrap());
        second.push(parts.next().unwrap().parse().unwrap());
    }

    let mut freq: HashMap<i32, i32> = HashMap::new();
    for num in second.iter() {
        let prev = match freq.get(num) {
            Some(num) => *num,
            None => 0,
        };
        freq.insert(*num, prev + 1);
    }

    let mut score = 0;
    for num in first.iter() {
        let val = match freq.get(num) {
            Some(val) => val,
            None => continue,
        };
        score += num * val;
    }

    Some(score.to_string())
}
