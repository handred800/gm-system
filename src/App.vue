<script setup>
import { computed, reactive, ref, watchEffect } from 'vue';
import { wait } from './utils/utils';
import { powerFunc } from './data/skill';

// player
const player = reactive({
  maxHp: 100,
  hp: 100,
  atk: 10,
})
const powers = reactive(Object.keys(powerFunc));

// enemy
const enemy = reactive({
  maxHp: 100,
  hp: 100,
  atk: 5
})

// battle
const roundCount = ref(0);
const isActing = ref(false);
const isEnemyTurn = computed(() => {
  return roundCount.value % 2 === 1;
})

watchEffect(() => {
  if(isEnemyTurn.value && !isActing.value) {
    battleHandler(enemy, player);
    console.log('enemy attack!(actually not)');
  }
})

async function battleHandler(sender, taker) {
  roundCount.value += 1;
  isActing.value = true;
  await wait(1);
  isActing.value = false;
}

async function playerAttack(power) {
  battleHandler(player, enemy);
  console.log(`player attack: ${power}`);
}
</script>

<template>
  <div>回合: {{ roundCount }} </div>
  <div>
    player {{ player.maxHp }} / {{ player.hp }}
  </div>

  <div>
    enemy {{ enemy.maxHp }} / {{ enemy.hp }}
  </div>
  <button class="btn" v-for="power in powers" :key="power" :disabled="isEnemyTurn || isActing" @click="playerAttack(power)">
    {{ power }}
  </button>
</template>

