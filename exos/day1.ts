import { A, F, flow, N, pipe, S } from 'https://esm.sh/@mobily/ts-belt@3.13.1'
import { day1Input } from '../input/day1js.ts'

const res = pipe(
  day1Input,
  S.split('\n'),
  A.map(flow((s) => s.split('   '), A.map(Number))),
  A.unzip,
  A.map(A.sort((a, b) => a - b)),
  ([a, b]) => A.zip(a, b),
  A.map(([a, b]) => Math.abs(N.subtract(a, b))),
  A.reduce(0, N.add),
)

// console.log(res);

const similarity = (list: number[]) => (num: number) => list.filter(F.equals(num)).length * num
const mapToSimilarity = ([l1, l2]: [number[], number[]]) => l1.map(similarity(l2))

const res2 = pipe(day1Input, S.split('\n'), A.map(flow((s) => s.split('   '), A.map(Number))), A.unzip, mapToSimilarity, A.reduce(0, N.add))

console.log(res2)
