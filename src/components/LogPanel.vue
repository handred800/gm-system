<script setup>
import { ref, computed, watch, TransitionGroup } from 'vue';
import { cloneDeep } from 'lodash';

const props = defineProps(['logList'])
const logs = computed(() => {
  return cloneDeep(props.logList).reverse();
})

const $panel = ref(null)
watch(logs.value, () => {
  $panel.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
})

</script>

<template>
  <div class="relative">
    <div ref="$panel" class="bg-slate-300 p-3 overflow-x-hidden overflow-y-auto h-48">
      <TransitionGroup name="log">
        <div v-for="log in logs" :key="log.id">{{ log.content }}</div>
      </TransitionGroup>
      <div class="absolute bg-gradient-to-t to-40% from-gray-300 w-full h-full top-0 left-0 pointer-events-none"></div>
    </div>
  </div>
</template>

<style scoped>
.log-enter-active,
.log-leave-active {
  transition: all 0.5s ease;
}

.log-enter-from,
.log-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>