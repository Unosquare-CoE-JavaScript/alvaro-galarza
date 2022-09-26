class Field {
    constructor(name) {
        this.name = name;
    }
}

class Class {
    constructor(name) {
        this.name = name;
        this.fields = [];
    }

    toString() {
        let output = [];
        output.push(`class ${this.name} {\n`);

        if (this.fields.length > 0) {
            output.push(`  constructor(`);
            for (let i = 0; i < this.fields.length; ++i) {
                output.push(this.fields[i].name);
                if (i + 1 !== this.fields.length)
                    output.push(', ');
            }
            output.push(`) {\n`);
            for (let field of this.fields) {
                output.push(`    this.${field.name} = ${field.name};\n`);
            }
            output.push('  }\n');
        }

        output.push('}');
        return output.join('');
    }
}

class CodeBuilder {
    constructor(className) {
        this._class = new Class(className);
    }

    addField(name) {
        this._class.fields.push(
            new Field(name)
        );
        return this;
    }

    toString() {
        return this._class.toString();
    }
}

let cb = new CodeBuilder('Person');
cb.addField('name')
    .addField('age');
console.log(cb.toString());