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
    let file = fs::read_to_string("./input.txt").unwrap();
    let mut parts = file.split("\n\n");

    let pairs: Vec<(i32, i32)> = parts
        .next()
        .unwrap()
        .lines()
        .map(|s| {
            let mut parts = s.split("|").map(|x| x.parse().unwrap());
            (parts.next().unwrap(), parts.next().unwrap())
        })
        .collect();

    let updates: Vec<Vec<i32>> = parts
        .next()
        .unwrap()
        .lines()
        .map(|s| s.split(",").map(|x| x.parse().unwrap()).collect())
        .collect();

    // each key should be before its values
    let mut before_rules: HashMap<i32, Vec<i32>> = HashMap::new();
    for (before, after) in pairs.iter() {
        match before_rules.get_mut(&before) {
            Some(afters) => afters.push(*after),
            None => {
                before_rules.insert(*before, vec![*after]);
            }
        }
    }

    // each key should be after its values
    let mut after_rules: HashMap<i32, Vec<i32>> = HashMap::new();
    for (before, after) in pairs.iter() {
        match after_rules.get_mut(&after) {
            Some(befores) => befores.push(*before),
            None => {
                after_rules.insert(*after, vec![*before]);
            }
        }
    }

    let valid_updates = updates.iter().filter(|&update| {
        let mut iter = update.iter();
        iter.all(|item| {
            let mut slice = update.split(|x| x == item);
            let before = slice.next().unwrap();
            let after = slice.next().unwrap();

            let b_rules = match before_rules.get(item) {
                Some(x) => x,
                None => &vec![],
            };

            let a_rules = match after_rules.get(item) {
                Some(x) => x,
                None => &vec![],
            };

            before.iter().all(|b| !b_rules.contains(b))
                && after.iter().all(|a| !a_rules.contains(a))
        })
    });

    let middles: i32 = valid_updates.map(|update| update[update.len() / 2]).sum();
    Some(middles.to_string())
}

fn part2() -> Option<String> {
    let file = fs::read_to_string("./input.txt").unwrap();
    let mut parts = file.split("\n\n");

    let pairs: Vec<(i32, i32)> = parts
        .next()
        .unwrap()
        .lines()
        .map(|s| {
            let mut parts = s.split("|").map(|x| x.parse().unwrap());
            (parts.next().unwrap(), parts.next().unwrap())
        })
        .collect();

    let updates: Vec<Vec<i32>> = parts
        .next()
        .unwrap()
        .lines()
        .map(|s| s.split(",").map(|x| x.parse().unwrap()).collect())
        .collect();

    // each key should be before its values
    let mut before_rules: HashMap<i32, Vec<i32>> = HashMap::new();
    for (before, after) in pairs.iter() {
        match before_rules.get_mut(&before) {
            Some(afters) => afters.push(*after),
            None => {
                before_rules.insert(*before, vec![*after]);
            }
        }
    }

    // each key should be after its values
    let mut after_rules: HashMap<i32, Vec<i32>> = HashMap::new();
    for (before, after) in pairs.iter() {
        match after_rules.get_mut(&after) {
            Some(befores) => befores.push(*before),
            None => {
                after_rules.insert(*after, vec![*before]);
            }
        }
    }

    let invalid_updates = updates
        .iter()
        .filter(|&update| {
            let mut iter = update.iter();
            iter.any(|item| {
                let mut slice = update.split(|x| x == item);
                let before = slice.next().unwrap();
                let after = slice.next().unwrap();

                let b_rules = match before_rules.get(item) {
                    Some(x) => x,
                    None => &vec![],
                };

                let a_rules = match after_rules.get(item) {
                    Some(x) => x,
                    None => &vec![],
                };

                !before.iter().all(|b| !b_rules.contains(b))
                    || !after.iter().all(|a| !a_rules.contains(a))
            })
        })
        .collect::<Vec<_>>();

    fn recurse(
        trav: Vec<i32>,
        before_rules: &HashMap<i32, Vec<i32>>,
        set: &Vec<i32>,
    ) -> Option<Vec<i32>> {
        let curr = trav.last().unwrap();

        let adj = match before_rules.get(curr) {
            Some(x) => x.clone(),
            None => vec![],
        }
        .into_iter()
        .filter(|x| set.contains(x))
        .collect::<Vec<_>>();

        // none base case: adjacencies contain member of traversal
        if adj.iter().any(|x| trav.contains(x)) {
            return None;
        }

        // some base case: traversal is of maximum length
        if trav.len() == set.len() {
            return Some(trav);
        };

        // none base case: no more adjacencies
        if adj.len() == 0 {
            return None;
        };

        for x in adj {
            let mut new_trav = trav.clone();
            new_trav.push(x);
            if let Some(new_trav) = recurse(new_trav, before_rules, set) {
                return Some(new_trav);
            }
        }

        return None;
    }

    println!("total {:?}", invalid_updates.len());

    let fixed_updates = invalid_updates.iter().map(|update| {
        println!("{:?}", update);
        let mut valid_trav = None;
        for x in update.iter() {
            if let Some(trav) = recurse(vec![*x], &before_rules, &update) {
                valid_trav = Some(trav);
            }
        }
        valid_trav.unwrap()
    });

    let middles: i32 = fixed_updates.map(|update| update[update.len() / 2]).sum();
    Some(middles.to_string())
}
