# Advent Of Code 2024

## Story Time

### Défi 1 : résoudre l'AOC en TypeScript pur

- pas de JS, que des types TS

#### Premier Exo

https://adventofcode.com/2024/day/1

> Splitter une chaine sur les retours à la ligne, parser chaque côté en number, trier chaque tableau, faire la soustraction des 2 nombres, faire l'absolu du résultat, faire l'addition de tous les résultats


Problème 1 : limite de récurcivité. TS s'arrête à 50 récursions sur une boucle normale, ou 1000 sur une "Tail Recursion"

- Solution 1 : Utiliser une Tail Recursion, donc un Accumulateur `Parse<Rest, [...Acc, Line]>` plutôt que `[Line, ...Parse<Rest>]`

Problème 2 : la limite de 1000 est trop simple, si l'exo avait 1001 lignes dans son input ça casserait. Donc trouver comment augmenter cette limite
- Solution 2 : Reset la Tail Recursion toutes les 100 itérations (source: https://herringtondarkholme.github.io/2023/04/30/typescript-magic/ )


Problème 3 : Trier un tableau en TypeScript
- Besoin de pouvoir comparer des nombres, donc :

Problème 4 : Faire une Addition, une Soustraction, une Multiplication ou un Absolu ...
- Solution 4 : https://itnext.io/implementing-arithmetic-within-typescripts-type-system-a1ef140a6f6f
- Cf. `helper/arithmetics.ts` : tentative d'implémentation, mais on est limité à des petits nombres, impossible de traiter des nombres supérieurs à 5000

- Solution 4 bis : https://github.com/arielhs/ts-arithmetic une lib optimisée pour les opérations arithmetics en TS

