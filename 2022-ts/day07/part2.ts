const input = await Deno.readTextFile("./input.txt");
const lines = input
  .split("\n")
  .filter((line) => line.length > 0)
  .splice(1);

type Folder = {
  name: string;
  contents: (Folder | File)[];
  size?: number;
};

type File = {
  name: string;
  size: number;
};

const root: Folder = {
  name: "/",
  contents: [],
};

const pwd = [root];
for (const line of lines) {
  if (line.includes("$ cd ..")) {
    pwd.shift();
    continue;
  }

  if (line.includes("$ cd ")) {
    const newPwd = line.split(" ")[2];
    pwd.unshift(pwd[0].contents.find((item) => item.name === newPwd) as Folder);
    continue;
  }

  if (line.includes("$ ls")) {
    continue;
  }

  if (line.includes("dir")) {
    const name = line.split(" ")[1];
    pwd[0].contents.unshift({ name, contents: [] } as Folder);
    continue;
  }

  const name = line.split(" ")[1];
  const size = parseInt(line.split(" ")[0]);
  pwd[0].contents.unshift({ name, size } as File);
}

const folderSizes: number[] = [];

function addFolderSize(folder: Folder) {
  folder.size = 0;
  for (const item of folder.contents) {
    if ("size" in item) {
      folder.size = folder.size + item.size!;
    } else {
      addFolderSize(item as Folder);
      folder.size = folder.size + item.size!;
    }
  }
  folderSizes.push(folder.size!);
}
addFolderSize(root);

const foldersThatCouldBeDeleted = folderSizes
  .sort((a, b) => a - b)
  .filter((size) => root.size! - size <= 40000000);

console.log(foldersThatCouldBeDeleted[0]);
