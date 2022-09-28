class Creature {
    constructor(attack, health) {
        this.attack = attack;
        this.health = health;
    }
}

class CardGame {
    constructor(creatures) {
        this.creatures = creatures;
    }

    combat(creature1index, creature2index) {
        let first = this.creatures[creature1index];
        let second = this.creatures[creature2index];
        this.hit(first, second);
        this.hit(second, first);
        let firstAlive = first.health > 0;
        let secondAlive = second.health > 0;
        if (firstAlive === secondAlive) return -1;
        return firstAlive ? creature1index : creature2index;
    }

    hit(attacker, defender) {
        throw new Error('Please implement this in inheritors');
    }
}

class TemporaryCardDamageGame extends CardGame {
    constructor(creatures) {
        super(creatures);
    }

    hit(attacker, defender) {
        let oldHealth = defender.health;
        defender.health -= attacker.attack;
        if (defender.health > 0)
            defender.health = oldHealth;
    }
}

class PermanentCardDamageGame extends CardGame {
    constructor(creatures) {
        super(creatures);
    }

    hit(attacker, defender) {
        defender.health -= attacker.attack;
    }
}

let c1 = new Creature(1, 2);
let c2 = new Creature(1, 2);
let game = new TemporaryCardDamageGame([c1, c2]);
console.log(game.combat(0, 1));

let cr1 = new Creature(1, 2);
let cr2 = new Creature(1, 3);
let game1 = new PermanentCardDamageGame([cr1, cr2]);
console.log(game1.combat(0, 1));
console.log(game1.combat(0, 1));