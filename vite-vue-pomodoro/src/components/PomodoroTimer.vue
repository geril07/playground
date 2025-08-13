<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'
import type { TPomodoroStage } from '../types/pomodoro'
import { defaultTimePerStages, displayedStages } from '../consts/pomodoro'

const { timePerStages = defaultTimePerStages } = defineProps<{
  timePerStages?: typeof defaultTimePerStages
}>()

const isRunning = ref(false)
const currentStage = ref<TPomodoroStage>('focus')
const timeLeft = ref(defaultTimePerStages[currentStage.value])

const toggleIsRunninig = () => {
  isRunning.value = !isRunning.value
}

const switchStage = (stage: TPomodoroStage) => {
  currentStage.value = stage
  isRunning.value = false
  timeLeft.value = timePerStages[stage]
}

const timeLeftInMinutes = computed(() => {
  const timeLeftV = timeLeft.value
  const minutes = Math.floor(timeLeftV / 60)
  const seconds = timeLeftV - minutes * 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

watch(isRunning, (_newVal, _oldValue, onCleanup) => {
  if (!isRunning.value) return

  const interval = setInterval(() => {
    timeLeft.value--
  }, 1000)

  onCleanup(() => clearInterval(interval))
})

watchEffect(() => {
  document.title = `${timeLeftInMinutes.value} - ${displayedStages[currentStage.value]}`
})
</script>

<template>
  <div>
    <div class="flex gap-2">
      <button
        v-for="[key, name] in Object.entries(displayedStages)"
        class="cursor-pointer"
        :class="{ 'text-blue-500': currentStage === key }"
        @click="switchStage(key as TPomodoroStage)"
      >
        {{ name }}
      </button>
    </div>

    <div class="">
      {{ timeLeftInMinutes }}
    </div>

    <div class="flex gap-2">
      <button @click="toggleIsRunninig">
        {{ isRunning ? 'Stop' : 'Start' }}
      </button>
    </div>
  </div>
</template>
