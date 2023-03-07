import { find } from "lodash";
import db from "../data/weapon.json";

class WEAPON {
  constructor({ name, power }) {
    this.name = name;
    this.power = power;
  }

  damage() {
    return () => this.power;
  }
}

export const build = (id) => {
  const data = find(db, (item) => item.id === id);
  return new WEAPON(data);
};
