<script setup>
import { reactive, ref, watch } from 'vue';
import { zeroToNArray } from '../utils/utils';

const props = defineProps(['items']);
const emit = defineEmits(['playCard']);

const reference = reactive(props.items);

watch(reference, () => {
    console.log('skill change');
})

const hand = ref(zeroToNArray(reference.length));
const deck = ref([]);

function play(i) {
    const skillOrder = hand.value.splice(i, 1)[0];
    deck.value.push(skillOrder);
    emit('playCard', deck.value);
}

function reset() {
    hand.value = zeroToNArray(reference.length);
    deck.value = [];
    emit('playCard', deck.value);
}

</script>

<template>
    <ul class="flex">
        <li v-for="skillOrder in deck" :key="skillOrder">{{ reference[skillOrder].name }}</li>
    </ul>
    <div class="flex">
        <button class="btn" v-for="(skillOrder, i) in hand" :key="skillOrder" @click="play(i)">{{ reference[skillOrder].name }}</button>
    </div>
    <button class="btn" @click="reset">reset</button>
</template>