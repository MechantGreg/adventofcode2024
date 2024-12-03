import { N } from "https://esm.sh/@mobily/ts-belt@3.13.1";

const text = await Deno.readTextFile("./input/day3.txt");
const matches = [...text.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)]
  .map(([, a, b]) => Number(a) * Number(b))
  .reduce(N.add, 0);
// console.log(matches);

const filtered = text
  .split("do()")
  .map((l) =>
    l.includes("don't()") ? l.substring(0, l.indexOf("don't()")) : l,
  )
  .join();

console.log(
  [...filtered.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)]
    .map(([, a, b]) => Number(a) * Number(b))
    .reduce(N.add, 0),
);
