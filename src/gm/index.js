import * as weapon from "./weapon";
import * as character from "./character";
import * as enemy from "./enemy"; 

import { mathUtils } from "../utils";

const rng = mathUtils.weightRandomCreator([
  { id: "1", weight: 1 },
  { id: "2", weight: 3 },
  { id: "3", weight: 5 },
]);

// 玩家初始化
// 創建角色
export const playerInit = (config) => {
  class PLAYER {
    constructor() {
      this.character = character.create(config);
      this.weapon = null;
    }

    equipWeapon() {
      this.weapon = weapon.build(rng().id);
      this.character.bindWeapon(this.weapon.power);
      console.log(
        `${this.character.name} get a ${this.weapon.name}!, damage is ${this.character.atk}`
      );
    }
  }

  const player = new PLAYER();
  player.equipWeapon();
  return player;
};

export const oppositionInit = (config) => {
  class OPPOSTION {
    constructor(){
      this.character = enemy.build(config);
    }
  }

  return new OPPOSTION();
}