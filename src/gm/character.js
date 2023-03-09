import { clamp } from "lodash";

class CHARACTER {
  constructor({ name, maxHp = 100, atk = 0 }) {
    this.name = name;
    this.maxHp = maxHp;
    this.atk = atk;
    this._hp = maxHp;
    this._isDead = false;

    return new Proxy(this, {
      set(target, prop, value) {
        if (prop === "_hp") {
          target[prop] = clamp(value, 0, this.maxHp);
          this._isDead = target[prop] === 0;
        } else {
          target[prop] = value;
        }
        return true;
      },
    });
  }

  dealHp(value) {
    this._hp += value;
  }

  bindWeapon(power) {
    this.atk = power;
  }
}

export const create = (config) => new CHARACTER(config);
