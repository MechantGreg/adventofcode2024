import { A, flow, pipe, S } from 'https://esm.sh/@mobily/ts-belt@3.13.1'
import { day2Input } from '../input/day2data.ts'

const isUnique = (arr: number[]) => A.uniq(arr).length === arr.length
const isSame = (arr1: number[], arr2: number[]) => A.zip(arr1, arr2).every(([a, b]) => a === b)
const isAsc = (arr: number[]) => isSame([...arr].sort((a, b) => a - b), arr)
const isDesc = (arr: number[]) => isSame([...arr].sort((a, b) => b - a), arr)

const checkSteps = (arr: number[]) =>
  arr.reduce<number[]>(
    (acc, curr, index, array) => array[index + 1] === undefined ? acc : [...acc, curr - array[index + 1]],
    [],
  ).every((a) => a < 4 && a > -4)

const isSafe = (arr: number[]) => isUnique(arr) && (isAsc(arr) || isDesc(arr)) && checkSteps(arr)

const res = pipe(
  day2Input,
  S.split('\n'),
  A.map(flow((s) => s.split(' '), A.map(Number))),
  A.filter(isSafe),
  A.length,
)

console.log('part 1', res)

const isSafeDampened = (arr: number[]) => arr.map((_, i, array) => A.removeAt(array, i)).some(isSafe)

const res2 = pipe(
  day2Input,
  S.split('\n'),
  A.map(flow((s) => s.split(' '), A.map(Number))),
  A.filter(isSafeDampened),
  A.length,
)

console.log('part 2', res2)
