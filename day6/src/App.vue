<script setup lang="ts">
import { D, N, S } from '@mobily/ts-belt'
import input from './input.txt?raw'
import Cell from './components/Cell.vue'
import { ref } from 'vue'

const array = input.split('\n').map(S.split('')) as (string | number)[][]

let total = 1
function compute() {
  let guard = {
    x: array.findIndex((line) => line.includes('^')) ?? 0,
    y: array.map((line) => line.findIndex((c) => c === '^')).filter((v) => v > -1)?.[0] ?? 0,
    xDir: -1,
    yDir: 0,
  }

  while (true) {
    array[guard.x][guard.y] = total++
    const x = guard.x + guard.xDir
    const y = guard.y + guard.yDir
    if (x < 0 || x >= array.length || y < 0 || y >= array[0].length) break
    if (array[x][y] === '#') {
      if (guard.xDir !== 0) guard = { ...guard, yDir: guard.xDir * -1, xDir: 0 }
      else guard = { ...guard, xDir: guard.yDir, yDir: 0 }
    } else {
      guard = D.merge(guard, { x, y })
    }
  }
}
compute()

let steps = ref(total)
function run() {
  steps.value = 0
  const start = Date.now()
  const interval = setInterval(() => {
    if (steps.value >= total) clearInterval(interval)
    steps.value = ((Date.now() - start) * total) / 20000
    if (steps.value > total) steps.value = total
  }, 10)
}

const result = array.map((line) => line.filter((v) => typeof v === 'number').length).reduce(N.add, 0)
</script>

<template>
  <div>
    <div class="grid">
      <template v-for="(line, x) in array">
        <template v-for="(value, y) in line">
          <Cell v-if="value !== '.'" :key="`${x}#${y}`" :type="value === '#' ? 'crate' : 'void'" :x :y :value="typeof value === 'number' && value < steps ? value : undefined" :steps />
        </template>
      </template>
    </div>
    <h1>Steps : {{ Math.floor(steps) }}</h1>
    <button @click="run">Run (20s)</button>
    <h2>Result: {{ result }}</h2>
  </div>
</template>

<style scoped>
.grid {
  position: relative;
  display: flex;
  width: 1040px;
  height: 1040px;
  background: #191919;
  flex-wrap: wrap;
  border: 1px solid #ccc;
}
</style>
