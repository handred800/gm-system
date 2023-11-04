<script setup>
import { computed, reactive, ref, watchEffect, watch } from 'vue';
import { wait } from './utils/utils';
import { flow } from 'lodash';
import Deck from './components/Deck.vue';
import { skills } from './data/skill';

// player
const player = reactive({
  name: 'player',
  maxHp: 100,
  hp: 100,
  atk: 10,
})

const playerSkills = reactive(skills);
const pipeOrder = ref([]);
const playerBuffFunc = computed(() => flow(pipeOrder.value.map((index) => playerSkills[index].func)))

// enemy
const enemy = reactive({
  name: 'monster',
  maxHp: 100,
  hp: 100,
  atk: 5
})

// battle
const isBattleEnd = ref(false);
const roundCount = ref(0);
const isActing = ref(false);
const isEnemyTurn = computed(() => {
  return roundCount.value % 2 === 1;
})
const isPlayerDisabled = computed(() => {
  return isActing.value || isEnemyTurn.value;
})

watchEffect(() => {
  if(isEnemyTurn.value && !isActing.value) {
    battleHandler(enemy, player);
  }
})

async function battleHandler(sender, taker, buffFunc) {
  roundCount.value += 1;
  isActing.value = true;

  const damage = buffFunc ? buffFunc(sender.atk) : sender.atk;
  taker.hp = taker.hp - damage <= 0 ? 0 : taker.hp - damage;
  console.log(`${sender.name} 對 ${taker.name} 造成 ${damage} 傷害`);

  // 結束檢查
  await wait(1);
  if (taker.hp <= 0) isBattleEnd.value = true;
  isActing.value = false;
}

function playerAttack() {
  battleHandler(player, enemy, playerBuffFunc.value);
}

</script>

<template>
  <div>回合: {{ roundCount }} </div>
  <div id="menuScene" v-if="isBattleEnd">
    <h1>遊戲結束</h1>
    <button class="btn">start</button>
  </div>
  <div id="battleScene" v-else>
    <div class="grid grid-cols-2 gap-4">
      <fieldset class="shadow p-1 border-2 border-slate-300">
        <legend class="px-2 bg-slate-500 text-white">{{ player.name }}</legend>
        {{ player.hp }} / {{ player.maxHp }} 
      </fieldset>
    
      <fieldset class="shadow p-1 border-2 border-slate-300">
        <legend class="px-2 bg-slate-500 text-white">{{ enemy.name }}</legend>
        {{ enemy.hp }} / {{ enemy.maxHp }}
      </fieldset>
    </div>
    <deck :items="playerSkills" @play-card="(order) => {pipeOrder = order}"></deck>
    <button class="btn" @click="playerAttack" :disabled="isPlayerDisabled">attack</button>
  </div>
</template>

