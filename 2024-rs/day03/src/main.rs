use regex::Regex;
use std::fs;

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
    let re = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();

    let result = re
        .captures_iter(&file)
        .map(|c| c.extract())
        .map(|(_, [a, b])| (a.parse::<i32>().unwrap(), b.parse::<i32>().unwrap()))
        .fold(0, |acc, (a, b)| acc + (a * b));

    Some(result.to_string())
}

fn part2() -> Option<String> {
    let file: String = fs::read_to_string("./input.txt").unwrap();
    let re = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();

    let result = file
        .split("do()")
        .map(|x| x.split("don't()").next().unwrap())
        .map(|haystack| {
            re.captures_iter(haystack)
                .map(|c| c.extract())
                .map(|(_, [a, b])| (a.parse::<i32>().unwrap(), b.parse::<i32>().unwrap()))
        })
        .flatten()
        .fold(0, |acc, (a, b)| acc + (a * b));

    Some(result.to_string())
}
