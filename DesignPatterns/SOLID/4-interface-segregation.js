var aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
      constructor (...args) {
        super(...args);
        mixins.forEach((mixin) => {
          copyProps(this,(new mixin));
        });
      }
    }
    let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
      Object.getOwnPropertyNames(source)
        .concat(Object.getOwnPropertySymbols(source))
        .forEach((prop) => {
          if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
            Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
        })
    };
    mixins.forEach((mixin) => {
      // outside constructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
      copyProps(base.prototype, mixin.prototype);
      copyProps(base, mixin);
    });
    return base;
  };
  
class Document
{

}

class Machine
{
    constructor()
    {
        if(this.constructor.name === 'Machine')
            throw Error('Machine is abstract!');
    }

    print(doc) {}
    fax(dosc) {}
    scan(dos) {}
}

class MultiFunctionPrinter extends Machine 
{
    print(doc) {

    }
    fax(doc) {

    }
    scan(doc) {

    }
}

class NotImplementedError extends Error 
{
    constructor(name) {
        let msg = `${name} is not implemented!`;
        super(msg);
        if(Error.captureStackTrace)
        Error.captureStackTrace(this, NotImplementedError);
    }
}
class OldFashionPrinter extends Machine
{
    print(dos) {

    }

    fax(doc) {
        // do nothing
        // principle of least surprise
    }

    scan(doc) {
        throw new NotImplementedError('OldFashionPrinter.scan');
    }
}

// ISP = segregate (splt up)

class Printer{
    constructor() {
        if(this.constructor.name === 'Printer')
            throw new Error('Printer is abstract!');
    }

    scan() {}
}

class Scanner{
    constructor() {
        if(this.constructor.name === 'Scanner')
            throw new Error('Scanner is abstract!');
    }

    scan() {}
}

//
class Photocopier {
    print() {}
    scan() {}
}

let printer = new OldFashionPrinter();

printer.scan();
