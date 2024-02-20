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
//JavaScript is duck typed whereas TypeScript is structurally typed.
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

//Excess Property Checking: If more fields are included than stated by the initial Object type error is shown
type ExpectedFields = {
  name: string;
  surname: string;
};

const correctAmount: ExpectedFields = {
  name: "Timur",
  surname: "Jalilov",
};

const incorrectAmount: ExpectedFields = {
  name: "Timur",
  surname: "Jalilov",
  address: "Hello", //Shows error as 'address' was not specified as a field on the ExpectedFields type.
};

//Excess Property Checking: Note this check only triggers for new object literals being created, providing a existing object literal bypasses excess property check.
const extraFieldObject = {
  name: "Timur",
  surname: "Jalilov",
  address: "hello",
};

const extraFieldNotChecked: ExpectedFields = extraFieldObject; //Excess property check hasn't been performed. Note normal field checked still happen if name or surname is missing error shown.

//Nested Object Types: Objects can be nested as members of other objects, type representation is same as before {...}
type ContainerObject = {
  nestedObject: {
    name: string;
    surname: string;
  };
  city: string;
};

const correctObject: ContainerObject = {
  nestedObject: { name: "timur", surname: "Jalilov" },
  city: "london",
};

const incorrectObject: ContainerObject = {
  nestedObject: {
    firstName: "timur", //Shows error as the correct properties were not passed to the nested object.
  },
  city: "london",
};

//Another reusable representation of the above nested object.
type Name = {
  name: string;
  surname: string;
};

type AliasedContainerObject = {
  nestedObject: Name;
  city: string;
};

const incorrectObject1: AliasedContainerObject = {
  nestedObject: {
    firstName: "timur", //Shows error as 'firstName' does not exist on Name type.
  },
  city: "london",
};

//Optional Properties: Not all object properties have to be required, including '?' before the ':' will make property optional. Note property that can be 'undefined' is not the same as optional.
type HasOptionalProperty = {
  required: string;
  optional?: number;
};

const onlyRequired: HasOptionalProperty = {
  required: "hello",
};

//Shows error as the required property 'required' hasn't been provided
const onlyOptional: HasOptionalProperty = {
  optional: 10,
};

//Inferred Object-Type Unions: If the initial value can be multiple object types the properties not contained in both types will be optional on opposing sides.
const dualObjectType =
  Math.random() > 0.5
    ? { sharedProperty: "hello", firstNotShared: 10 }
    : { sharedProperty: "hello", secondNotShared: false };

// Type:
// {
//   sharedProperty: string;
//   firstNotShared: number;
//   secondNotShared?: undefined;
// }
// {
//   sharedProperty: string;
//   firstNotShared?: undefined;
//   secondNotShared: boolean;
// }

dualObjectType.sharedProperty; // is guaranteed to be 'string' as it's included in both types
dualObjectType.firstNotShared; // could be 'number | undefined' as it's not guaranteed.
dualObjectType.secondNotShared; // could be 'boolean | undefined' as it's not guaranteed.

//Explicit Object-Type Unions: Best practice to write your own object types. Added benefit unions formed with explicitly typed object types allow access only to shared properties.
type FirstType = {
  name: string;
  surname: string;
};

type SecondType = {
  name: string;
  message: string;
};

type Union = FirstType | SecondType;

const unionObject: Union =
  Math.random() > 0.5
    ? { name: "timur", surname: "jalilov" }
    : { name: "timur", message: "hello" };

//Restricting access to non existant members of a object is good for code safety
unionObject.name;
unionObject.surname; //Shows error because surname is not guaranteed property of 'Union' type and surname does not exist in 'SecondType'.
unionObject.message; //Shows error because message is not guaranteed property of 'Union' type and message does not exist in 'FirstType'.
