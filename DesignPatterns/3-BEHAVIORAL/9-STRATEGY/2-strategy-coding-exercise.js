class Creature {
    constructor(attack, health) {
        this.attack = attack;
        this.health = health;
        this.alive = this.health > 0;
        this.id = Creature.count++;
    }
}
Creature.count = 0;

class Game {
    constructor(damageStrategy) {
        this.damageStrategy = damageStrategy;
    }

    springTrapOn(creature) {
        this.damageStrategy.damage(creature);
        return creature.alive;
    }
}

class DamageStrategy {
    damage(creature) {
        if (creature.health <= 0) {
            creature.alive = false;
        }
    }
}

class ConstantDamageStrategy extends DamageStrategy {
    damage(creature) {
        creature.health--;
        super.damage(creature);
    }
}

class GrowingDamageStrategy extends DamageStrategy {
    damage(creature) {
        if (GrowingDamageStrategy.impact[creature.id]) {
            let dmg = ++GrowingDamageStrategy.impact[creature.id];
            creature.health -= dmg;
        }
        else {
            creature.health--;
            GrowingDamageStrategy.impact[creature.id] = 1;
        }

        super.damage(creature);
    }
}
GrowingDamageStrategy.impact = {};


let cg = new Game(new ConstantDamageStrategy());
let c = new Creature(1, 3);
console.log(c.health, c.alive);
cg.springTrapOn(c);
console.log(c.health, c.alive);
cg.springTrapOn(c);
console.log(c.health, c.alive);
cg.springTrapOn(c);
console.log(c.health, c.alive);

let cg2 = new Game(new GrowingDamageStrategy());
let c2 = new Creature(1, 3);
console.log(c2.health, c2.alive);
cg2.springTrapOn(c2);
console.log(c2.health, c2.alive);
cg2.springTrapOn(c);
console.log(c2.health, c2.alive);

console.log('two creatures are used here...');
let cg3 = new Game(new GrowingDamageStrategy());
let c3 = new Creature(1, 3);
let c4 = new Creature(1, 3);

console.log('springing a trap on both creatures');
console.log('expecting each creature to be damaged by 1');
cg3.springTrapOn(c3);
cg3.springTrapOn(c4);
console.log(c3.health, c3.alive);
console.log(c4.health, c4.alive);
cg3.springTrapOn(c4);
console.log(c4.health, c4.alive);