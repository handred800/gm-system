<script setup>
import { TransitionGroup } from 'vue';
const props = defineProps(['count'])
</script>
<template>
    <TransitionGroup mode="in-out" tag="div" name="stagger" :style="{ '--total': props.count }">
        <span class="inline-block mx-0.5 w-2 h-4 rounded-full bg-sky-400" v-for="index in props.count" :key="index" :style="{'--i': index}"></span>
    </TransitionGroup>
</template>

<style scoped>
.stagger-move,
.stagger-enter-active,
.stagger-leave-active {
  transition: all 0.5s ease-in-out;
}

.stagger-enter-active {
    transition-delay: calc( 0.1s * var(--i) );
}

.stagger-leave-active {
    transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
}

.stagger-enter-from,
.stagger-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.stagger-leave-active {
  /* position: absolute; */
}
</style>