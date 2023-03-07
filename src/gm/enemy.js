import { find } from "lodash";
import db from "../data/enemy.json";
import * as character from "./character";

class ENEMY {
  constructor(config) {
    this.charactor = character.create(config);
  }
}

export const build = (id) => {
  const data = find(db, (item) => item.id === id);
  return new ENEMY(data);
};
