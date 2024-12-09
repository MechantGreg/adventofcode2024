<script lang="ts" setup>
import { computed } from 'vue'

const { type, x, y, value, steps } = defineProps<{
  type: 'void' | 'crate'
  x: number
  y: number
  value?: number
  steps: number
}>()
const background = computed(() => {
  if (type === 'crate') return '#baa985'
  if (typeof value === 'undefined') return '#000'
  return `rgba(10,60,${Math.floor((value * 255) / steps)}, 200)`
})
const style = computed(() => `top: ${x * 8}px; left:${y * 8}px; background: ${background.value}`)
</script>

<template>
  <div class="cell" :class="type" :style />
</template>

<style lang="css" scoped>
.cell {
  position: absolute;
  width: 6px;
  height: 6px;
}
.cell.crate {
  border: 1px solid #4a3015;
}
</style>
