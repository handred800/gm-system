<script setup>
import { computed, reactive, ref, watchEffect, TransitionGroup } from 'vue';
import { wait } from './utils/utils';
import { flow, sum } from 'lodash';
import { useBucket } from './composable/useBucket';
import { skills } from './data/skill';
import LogPanel from './components/LogPanel.vue';
import StaggerList from './components/StaggerList.vue';

// player
const player = reactive({
  name: 'player',
  maxHp: 100,
  hp: 100,
  atk: 10,
  energy: 3
})

const playerSkills = reactive(skills);
const skillsBucket = useBucket(playerSkills.length);
const playerBuffFunc = computed(() => flow(skillsBucket.bucket.value.map((index) => playerSkills[index].func)))
const energyConsume = computed(() => sum(skillsBucket.bucket.value.map((index) => playerSkills[index].consume)))

// enemy
const enemy = reactive({
  name: 'monster',
  maxHp: 100,
  hp: 100,
  atk: 5,
})

// battle
const isBattleEnd = ref(false);
const roundCount = ref(0);
const isActing = ref(false);
const battleLog = reactive([]);
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

  const damage = buffFunc ? Math.floor(buffFunc(sender.atk)) : Math.floor(sender.atk);
  taker.hp = taker.hp - damage <= 0 ? 0 : taker.hp - damage;
  
  battleLog.push({
    id: battleLog.length,
    content: `${sender.name} 對 ${taker.name} 造成 ${damage} 傷害`
  })

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
      <!-- player -->
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="card-title">{{ player.name }}</div>
          <div class="bg-stone-300 w-full h-4 rounded-full overflow-hidden">
            <div class="h-4 duration-700 delay-300 out-expo bg-stone-700" :style="{'width': `${(player.hp / player.maxHp) * 100}%` }"></div>
          </div>
          <div class="text-xs">{{ player.hp }} / {{ player.maxHp }}</div>
          <div>
            <div class="tooltip tooltip-right" :data-tip="player.energy">
              <span class="inline-block mx-0.5 w-2 h-4 rounded-full bg-stone-400" v-for="index in player.energy" :key="index"></span>
            </div>
          </div>
          <div>
            <div class="tooltip tooltip-right" :data-tip="energyConsume">
              <StaggerList :count="energyConsume"></StaggerList>
            </div>
          </div>
        </div>
      </div>
    
      <!-- enemy -->
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="card-title">{{ enemy.name }}</div>
          <div class="bg-stone-300 w-full h-4 rounded-full overflow-hidden">
            <div class="h-4 duration-700 delay-300 out-expo bg-stone-700" :style="{'width': `${(enemy.hp / enemy.maxHp) * 100}%` }"></div>
          </div>
          <div class="text-xs">{{ enemy.hp }} / {{ enemy.maxHp }}</div>
        </div>
      </div>
    </div>
    
    <div>
      <span class="inline-block p-2" v-for="skillIndex in skillsBucket.bucket.value" :key="skillIndex">{{ playerSkills[skillIndex].name }}</span>
      <span class="inline-block p-2 font-bold">{{ skillsBucket.bucket.value.length <= 0 ? player.atk : Math.floor(playerBuffFunc(player.atk)) }}</span>      
    </div>

    <log-panel :log-list="battleLog"></log-panel>
    <!-- 操作區 -->
    <div class="join">
      <div class="indicator" v-for="(skillIndex, i) in skillsBucket.pool.value" :key="skillIndex"> 
        <button class="btn join-item" @click="skillsBucket.addToBucket(i)">
          {{ playerSkills[skillIndex].name }}
          <span class="badge badge-neutral">{{ playerSkills[skillIndex].consume }}</span>
        </button>
      </div>
    </div>
    <div>
      <button class="btn" @click="skillsBucket.reset">reset</button>
      <button class="btn" @click="playerAttack" :disabled="isPlayerDisabled">attack</button>
    </div>
  </div>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.fade-leave-active {
  position: absolute;
}
</style>

