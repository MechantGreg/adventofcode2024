import { A, N, pipe, S } from 'https://esm.sh/@mobily/ts-belt@3.13.1'

const text = await Deno.readTextFile('./input/day5.txt')
const [rules, list] = text.split('\n\n')

const rulesList = pipe(
  rules,
  S.split('\n'),
  A.map(S.split('|')),
  (arr) =>
    arr.reduce((obj, [v, next]) => {
      obj[v] = { ...(obj[v] ?? {}), [next]: true }
      return obj
    }, {} as Record<string, Record<string, boolean>>),
)

const isValid = ([first, ...rest]: string[]): boolean => !rest.length || (rest.every((next: string) => !rulesList[next]?.[first]) && isValid(rest))
const pages = pipe(
  list,
  S.split('\n'),
  A.map(S.split(',')),
  A.filter(isValid),
  A.map((arr) => Number(arr[(arr.length - 1) / 2])),
  A.reduce(0, N.add),
)
console.log(pages)

const isNotValid = (list: string[]) => !isValid(list)
const reorderPages = (list: string[]) =>
  [...list].sort((a, b) => {
    if (rulesList[a]?.[b]) return 1
    if (rulesList[b]?.[a]) return -1
    return 0
  })

const wrongPages = pipe(
  list,
  S.split('\n'),
  A.map(S.split(',')),
  A.filter(isNotValid),
  A.map(reorderPages),
  A.map((arr) => Number(arr[(arr.length - 1) / 2])),
  A.reduce(0, N.add),
)
console.log(wrongPages)
