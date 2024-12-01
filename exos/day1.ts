import { Add, Subtract, Gt } from "ts-arithmetic";
import { Incr } from "../helper/recursion";
import { Day1Data } from "../input/day1data";

type SplitByLine<Data extends string, Acc extends string[] = [], Iterations extends Incr[number] = 0> = Iterations extends 100
  ? SplitByLine<Data, Acc, 0> & {}
  : Data extends `${infer Line extends string}\n${infer Rest extends string}`
  ? SplitByLine<Rest, [...Acc, Line], Incr[Iterations]>
  : [...Acc, Data];

type SplitOnSpaces<Data extends string[], Acc extends [number[], number[]] = [[], []], Iterations extends Incr[number] = 0> = Iterations extends 100
  ? SplitOnSpaces<Data, Acc, 0> & {}
  : Data extends [infer First, ...infer Rest extends string[]]
  ? First extends `${infer N1 extends number}   ${infer N2 extends number}`
    ? SplitOnSpaces<Rest, [[...Acc[0], N1], [...Acc[1], N2]]>
    : never
  : Acc;

type Sort<Data extends number[]> = Data extends [infer Start extends number, ...infer Rest extends number[]] ? SortArray<Start, Rest> : [];
type SortArray<
  Middle extends number,
  Data extends number[],
  Acc extends [number[], number[]] = [[], []],
  Iterations extends Incr[number] = 0
> = Iterations extends 100
  ? SortArray<Middle, Data, Acc, 0> & {}
  : Data extends [infer Entry extends number, ...infer Rest extends number[]]
  ? Gt<Middle, Entry> extends 1
    ? SortArray<Middle, Rest, [[...Acc[0], Entry], Acc[1]], Incr[Iterations]>
    : SortArray<Middle, Rest, [Acc[0], [...Acc[1], Entry]], Incr[Iterations]>
  : [...Sort<Acc[0]>, Middle, ...Sort<Acc[1]>];

type Subtracted<List1 extends number[], List2 extends number[], Acc extends number[] = []> = List1 extends [
  infer L1 extends number,
  ...infer Rest1 extends number[]
]
  ? List2 extends [infer L2 extends number, ...infer Rest2 extends number[]]
    ? Gt<L1, L2> extends 1
      ? Subtracted<Rest1, Rest2, [...Acc, Subtract<L1, L2>]>
      : Subtracted<Rest1, Rest2, [...Acc, Subtract<L2, L1>]>
    : Acc
  : Acc;

type Sum<List extends number[]> = List extends [infer First extends number, infer Second extends number, ...infer Rest extends number[]]
  ? Sum<[Add<First, Second>, ...Rest]>
  : List extends [infer First]
  ? First
  : 0;

type DataSplitByLine = SplitByLine<Day1Data>;
type DataSplitBySpace = SplitOnSpaces<DataSplitByLine>;

type DataSorted1 = Sort<DataSplitBySpace[1]>
type DataSorted0 = Sort<DataSplitBySpace[0]>

type DataSubed = Subtracted<DataSorted0, DataSorted1>;
type Result = Sum<DataSubed>;
