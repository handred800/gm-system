import { clamp } from "lodash";

class CHARACTER {
  constructor({ name, hp, damage }) {
    this._hp = hp || 100;
    this._isDead = false;
    this._damage = damage || 0;
    this.name = name;

    return new Proxy(this, {
      set(target, prop, value) {
        if (prop === "_hp") {
          target[prop] = clamp(value, 0, 100);
        } else {
          target[prop] = value;
        }
        return true;
      },
    });
  }

  init() {
    console.log(`${this.name} is created`);
  }

  dealHp(value) {
    if (this._isDead) return;

    this._hp += value;
    console.log(`${this.name}'s health now is ${this._hp}`);
    if (this._hp === 0) this.dead();
  }

  bindWeapon(power) {
    this._damage = power;
  }

  dead() {
    this._isDead = true;
    console.log(`${this.name} fall down :(`);
  }
}

export const create = (config) => {
  const ch = new CHARACTER(config);
  ch.init();
  return ch;
};
