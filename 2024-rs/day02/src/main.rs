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
    let lines = file.lines().collect::<Vec<_>>();

    let reports = lines
        .into_iter()
        .map(|x| {
            x.split_whitespace()
                .into_iter()
                .map(|x| x.parse::<i32>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();

    let result = reports
        .iter()
        .map(|report| {
            let (asc, diff): (Vec<_>, Vec<_>) = report
                .iter()
                .zip(report.iter().skip(1))
                .map(|(&x, &y)| (y - x >= 0, (y - x).abs()))
                .unzip();

            let same_asc = asc.iter().all(|&x| x == true) || asc.iter().all(|&x| x == false);
            let okay_diff = diff.iter().all(|x| (1..=3).contains(x));

            same_asc && okay_diff
        })
        .fold(0, |acc, x| if x { acc + 1 } else { acc });

    Some(result.to_string())
}

// returns the first indexes, if available, of things that break validity
fn check_validity(report: &Vec<i32>) -> (Option<usize>, Option<usize>) {
    let (asc, diff): (Vec<_>, Vec<_>) = report
        .iter()
        .zip(report.iter().skip(1))
        .map(|(&x, &y)| (y - x >= 0, (y - x).abs()))
        .unzip();

    // find index of the level that's not ascending/descending properly
    let cumulative = asc.iter().fold(0, |acc, &x| acc + if x { 1 } else { -1 });
    let bad_asc = asc.iter().position(|&x| x == (cumulative < 0));

    // find index of the level that's has a bad diff
    let bad_diff = diff.iter().position(|x| !(1..=3).contains(x));

    (bad_asc, bad_diff)
}

fn part2() -> Option<String> {
    let file: String = fs::read_to_string("./input.txt").unwrap();
    let lines = file.lines().collect::<Vec<_>>();

    let reports = lines
        .into_iter()
        .map(|x| {
            x.split_whitespace()
                .into_iter()
                .map(|x| x.parse::<i32>().unwrap())
                .collect::<Vec<_>>()
        })
        .collect::<Vec<_>>();

    let result = reports
        .iter()
        .map(|report| {
            // brute force, see if removing one will make it valid
            // don't have to check original report because some logic
            let mut one_removed = false;
            for i in 0..report.len() {
                let mut new_report = report.clone();
                new_report.remove(i);
                let (asc, diff) = check_validity(&new_report);
                if asc.is_none() && diff.is_none() {
                    one_removed = true;
                    break;
                }
            }
            one_removed
        })
        .fold(0, |acc, x| if x { acc + 1 } else { acc });

    Some(result.to_string())
}
