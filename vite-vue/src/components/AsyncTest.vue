<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { ref, watchEffect } from 'vue'

const emit = defineEmits<{ add: [{ asd: number }] }>()

const form = ref<{ a: string }>({
  a: '',
})

watchEffect(() => {
  console.log('form :', form.value.a)
})


const query = useQuery({
  queryKey: ['asd'],
  queryFn: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ a: '111' }), 5000)
    })
  },
})
</script>
asd


<template>
  <div>
    <input v-model="form.a" :disabled="query.isLoading.value" />
  </div>
  asd
</template>

<style>
</style>
