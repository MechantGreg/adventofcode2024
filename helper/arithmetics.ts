// https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f

import { Incr } from "./recursion";

export type Length<T extends any[]> = T extends { length: infer L extends number } ? L : never;
// Tentative d'ajouter le tricks d'Iterations pour bypasser la limite de recursion et supporter des nombres plus grands
export type BuildTuple<L extends number, T extends any[] = [], Iterations extends Incr[number] = 0> = Iterations extends 100
  ? BuildTuple<L, T, 0> & {}
  : T extends { length: L }
  ? T
  : BuildTuple<L, [...T, any]>;

export type UnsafeAdd<A extends number, B extends number> = Length<[...BuildTuple<A>, ...BuildTuple<B>]>;
export type UnsafeSubtract<A extends number, B extends number> = BuildTuple<A> extends [...infer U, ...BuildTuple<B>] ? Length<U> : never;
export type MultiAdd<N extends number, A extends number, I extends number> = I extends 0 ? A : MultiAdd<N, UnsafeAdd<N, A>, UnsafeSubtract<I, 1>>;
export type EQ<A, B> = A extends B ? (B extends A ? true : false) : false;
export type AtTerminus<A extends number, B extends number> = A extends 0 ? true : B extends 0 ? true : false;
export type LT<Small extends number, Big extends number> = BuildTuple<Big> extends [...BuildTuple<Small>, ...any[]] ? true : false;
export type MultiSub<N extends number, D extends number, Q extends number> = LT<N, D> extends true ? Q : MultiSub<UnsafeSubtract<N, D>, D, UnsafeAdd<Q, 1>>;
export type UnsafeMultiply<A extends number, B extends number> = MultiAdd<A, 0, B>;
export type UnsafeDivide<A extends number, B extends number> = MultiSub<A, B, 0>;
export type UnsafeModulo<A extends number, B extends number> = LT<A, B> extends true ? A : UnsafeModulo<UnsafeSubtract<A, B>, B>;
export type IsPositive<N extends number> = `${N}` extends `-${number}` ? false : true;
export type IsWhole<N extends number> = `${N}` extends `${number}.${number}` ? false : true;
export type IsValid<N extends number> = IsPositive<N> extends true ? (IsWhole<N> extends true ? true : false) : false;
export type AreValid<A extends number, B extends number> = IsValid<A> extends true ? (IsValid<B> extends true ? true : false) : false;

export type Add<A extends number, B extends number> = AreValid<A, B> extends true ? UnsafeAdd<A, B> : never;
export type Subtract<A extends number, B extends number> = AreValid<A, B> extends true ? UnsafeSubtract<A, B> : never;
export type Multiply<A extends number, B extends number> = AreValid<A, B> extends true ? UnsafeMultiply<A, B> : never;
export type Divide<A extends number, B extends number> = AreValid<A, B> extends true ? UnsafeDivide<A, B> : never;
export type Modulo<A extends number, B extends number> = AreValid<A, B> extends true ? UnsafeModulo<A, B> : never;

// Ce calcul est déjà trop long, et échoue avec des chiffres encore plus grand
type res = Add<3000, 2800>;
