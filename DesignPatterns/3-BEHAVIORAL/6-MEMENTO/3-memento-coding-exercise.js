class Token {
    constructor(value = 0) {
        this.value = value;
    }
}

class Memento {
    constructor() {
        this.tokens = [];
    }
}

class TokenMachine {
    constructor() {
        this.tokens = [];
    }

    addTokenValue(value) {
        return this.addToken(new Token(value));
    }

    addToken(token) {
        this.tokens.push(token);
        let m = new Memento();
        m.tokens = this.tokens.map(t => new Token(t.value));
        return m;
    }

    revert(m) {
        this.tokens = m.tokens.map(t => new Token(t.value));
    }
}
{
    let tm = new TokenMachine();
    let m = tm.addTokenValue(123);
    tm.addTokenValue(456);
    tm.revert(m);
    console.log(tm.tokens.length, tm.tokens[0].value);
}

{
    let tm = new TokenMachine();
    tm.addTokenValue(1);
    let m = tm.addTokenValue(2);
    tm.addTokenValue(3);
    tm.revert(m);
    console.log(tm.tokens.length, tm.tokens[0].value, tm.tokens[1].value);
}

{
    let tm = new TokenMachine();
    console.log('made a token with value 111 and kept a reference');
    let token = new Token(111);
    console.log('added this token to the list');
    tm.addToken(token);
    let m = tm.addTokenValue(222);
    console.log('changed this token\'s value to 333 :)');
    token.value = 333;
    tm.revert(m);
    console.log(tm.tokens.length, tm.tokens[0].value);
}