export {};

//Object Types: When you create a object literal {...} it will be set to object type or type shape based on it's properties.
let person = {
  name: "timur",
  age: 26,
};

person.name;
person.age;

person.address; //Shows error as 'address' does not exist on 'person' type.

//Declaring Object Types: Objects type can be inferred but to declare the type manually can be done using this syntax:
let person2: {
  name: string;
  age: number;
};

person2 = {
  name: "timur",
  age: 26,
};

person2 = "hello"; //Shows error as 'string' is not assignable to 'object'.

//Aliased Object Types: Aliases can be used to create object types.
type Person = {
  name: string;
  age: number;
};

let person3: Person;

//Structural Typing: any value that satisfies the type is allowed to be used.
//JavaScript is duck typed whereas TypeScript is structurally typed. Duck typing object types aren't checked until runtime.
type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Timur",
  lastName: "Jalilov",
};

let withFirstName: WithFirstName = hasBoth;
let withLastName: WithLastName = hasBoth;

//Usage Checking: value is checked if it's assignable to the Object Type, it must have all the Object types required properties.
type FirstAndLastNames = {
  first: string;
  last: string;
};

const hasBoth2: FirstAndLastNames = {
  first: "Timur",
  last: "Jalilov",
};

  const hasOnlyOne: FirstAndLastNames = { //Shows error as 'last' property is missing.

  first: "Timur",
};

//Mismatched types: Mismatched types are not allowed. Object types specify both the property and the Type of the property.
type TimeRange = {
  start: Date;
};

const hasStartString: TimeRange = {
  start: "01/01/2024", //Shows error as 'string' is not assignable to 'Date'.
};

//Excess Property Checking:
