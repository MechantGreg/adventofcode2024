import { N } from "https://esm.sh/@mobily/ts-belt@3.13.1";

const text = await Deno.readTextFile("./input/day4.txt");
const str = "XMAS";
const len = str.length;

const array = text.split("\n").map((line) => line.split(""));
const res = array
  .map((line, x) => line.map((_, y) => count(x, y)).reduce(N.add, 0))
  .reduce(N.add, 0);

function count(x: number, y: number) {
  return [-1, 0, 1]
    .flatMap((xDir) =>
      [-1, 0, 1].map((yDir) =>
        xDir === 0 && yDir === 0 ? 0 : countDir(x, y, xDir, yDir),
      ),
    )
    .reduce(N.add, 0);
}

function countDir(x: number, y: number, xDir: number, yDir: number, strI = 0) {
  if (strI === len) return 1;
  if (
    x < 0 ||
    y < 0 ||
    x >= array.length ||
    y >= array[0].length ||
    array[x][y] !== str[strI]
  ) {
    return 0;
  }
  return countDir(x + xDir, y + yDir, xDir, yDir, strI + 1);
}

console.log(res);

const res2 = array
  .map((line, x) => line.map((_, y) => isXMas(x, y)).reduce(N.add, 0))
  .reduce(N.add, 0);

function isXMas(x: number, y: number) {
  if (
    array[x][y] !== "A" ||
    x < 1 ||
    y < 1 ||
    x - 1 >= array.length ||
    y - 1 >= array[0].length
  )
    return 0;
  const cross = [
    array[x - 1][y - 1],
    array[x + 1][y - 1],
    array[x - 1][y + 1],
    array[x + 1][y + 1],
  ];
  if (cross.sort().join("") !== "MMSS") return 0;
  return array[x - 1][y - 1] === array[x + 1][y + 1] ? 0 : 1;
}

console.log(res2);
