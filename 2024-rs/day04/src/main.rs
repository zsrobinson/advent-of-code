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

fn check_xmas(s: [char; 4]) -> bool {
    (s[0] == 'X' && s[1] == 'M' && s[2] == 'A' && s[3] == 'S')
        || (s[0] == 'S' && s[1] == 'A' && s[2] == 'M' && s[3] == 'X')
}

fn part1() -> Option<String> {
    let file: String = fs::read_to_string("./input.txt").unwrap();
    let lines = file.lines().collect::<Vec<_>>();
    let grid = lines
        .iter()
        .map(|l| l.chars().collect::<Vec<_>>())
        .collect::<Vec<_>>();

    let height = grid.len();
    let width = grid.get(0).unwrap().len();

    let mut horizontal = 0;
    for i in 0..height {
        for j in 0..(width - 3) {
            let string = [grid[i][j], grid[i][j + 1], grid[i][j + 2], grid[i][j + 3]];
            if check_xmas(string) {
                horizontal += 1;
            }
        }
    }

    let mut vertical = 0;
    for i in 0..(height - 3) {
        for j in 0..width {
            let string = [grid[i][j], grid[i + 1][j], grid[i + 2][j], grid[i + 3][j]];
            if check_xmas(string) {
                vertical += 1;
            }
        }
    }

    let mut diagonal = 0;
    for i in 0..(height - 3) {
        for j in 0..(width - 3) {
            let string = [
                grid[i][j],
                grid[i + 1][j + 1],
                grid[i + 2][j + 2],
                grid[i + 3][j + 3],
            ];
            if check_xmas(string) {
                diagonal += 1;
            }
        }
    }

    let mut other_diagonal = 0;
    for i in 0..(height - 3) {
        for j in 3..width {
            let string = [
                grid[i][j],
                grid[i + 1][j - 1],
                grid[i + 2][j - 2],
                grid[i + 3][j - 3],
            ];
            if check_xmas(string) {
                other_diagonal += 1;
            }
        }
    }

    let total = horizontal + vertical + diagonal + other_diagonal;
    Some(total.to_string())
}

fn check_x_mas(s: [char; 9]) -> bool {
    s[4] == 'A'
        && ((s[0] == 'M' && s[8] == 'S') || (s[0] == 'S' && s[8] == 'M'))
        && ((s[2] == 'M' && s[6] == 'S') || (s[2] == 'S' && s[6] == 'M'))
}

fn part2() -> Option<String> {
    let file: String = fs::read_to_string("./input.txt").unwrap();
    let lines = file.lines().collect::<Vec<_>>();
    let grid = lines
        .iter()
        .map(|l| l.chars().collect::<Vec<_>>())
        .collect::<Vec<_>>();

    let height = grid.len();
    let width = grid.get(0).unwrap().len();

    let mut total = 0;
    for i in 0..(height - 2) {
        for j in 0..(width - 2) {
            let string = [
                grid[i][j],
                grid[i][j + 1],
                grid[i][j + 2],
                grid[i + 1][j],
                grid[i + 1][j + 1],
                grid[i + 1][j + 2],
                grid[i + 2][j],
                grid[i + 2][j + 1],
                grid[i + 2][j + 2],
            ];
            if check_x_mas(string) {
                total += 1;
            }
        }
    }

    Some(total.to_string())
}
