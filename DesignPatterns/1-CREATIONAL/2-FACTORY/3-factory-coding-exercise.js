class Person
{
  constructor(id, name)
  {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory
{
  createPerson(name)
  {
    return new Person(
      PersonFactory.id++,
      name
    );
  }
}
PersonFactory.id = 0;

let pf = new PersonFactory();
let person1 = pf.createPerson('Alvaro');
let person2 = pf.createPerson('Mauricio');
console.log(pf);
console.log(person1);
console.log(person2);