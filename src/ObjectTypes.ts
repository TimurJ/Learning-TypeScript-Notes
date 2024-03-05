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

let person3: Person = { name: "timur", age: 10 };

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

const hasOnlyOne: FirstAndLastNames = {
  //Shows error as 'last' property is missing.
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
  optional?: number; //Use undefined and required when you need to make sure the user should decide explicitly
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
// |
// {
//   sharedProperty: string;
//   firstNotShared?: undefined;
//   secondNotShared: boolean;
// }

dualObjectType.sharedProperty; // is guaranteed to be 'string' as it's included in both types
dualObjectType.firstNotShared; // could be 'number | undefined' as it's not guaranteed.
dualObjectType.secondNotShared; // could be 'boolean | undefined' as it's not guaranteed.

//Explicit Object-Type Unions: Best practice to write your own object types. Added benefit unions formed with explicitly typed object types allow access only to shared properties.
type TypeWithSurname = {
  name: string;
  surname: string;
};

type TypeWithMessage = {
  name: string;
  message: string;
};

type Union = TypeWithSurname | TypeWithMessage;

const unionObject: Union =
  Math.random() > 0.5
    ? { name: "timur", surname: "jalilov" }
    : { name: "timur", message: "hello" };

//Restricting access to non existant members of a object is good for code safety
unionObject.name;
unionObject.surname; //Shows error because surname is not guaranteed property of 'Union' type and surname does not exist in 'SecondType'.
unionObject.message; //Shows error because message is not guaranteed property of 'Union' type and message does not exist in 'FirstType'.

type CreateRequest = {
  type: "CreateRequest";
  data: {
    name: string;
    surname: string;
  };
};

type CreateAck = {
  type: "CreateAck";
  correlationId: string;
};

type CreateNack = {
  type: "CreateNack";
  correlationId: string;
  message: string;
};

type MessageType = CreateRequest | CreateAck | CreateNack;

const message: MessageType = {
  type: "CreateRequest",
  data: { name: "timur", surname: "jalilov" },
};

switch (message.type) {
  case "CreateRequest":
    message.data.name;
    break;
}

//Narrowing object types: If the type checker sees the code block can only be run if the typed value contains a certain property it will narrow the type.
const unionObjectToBeNarrowed: Union =
  Math.random() > 5
    ? { name: "timur", surname: "jalilov" }
    : { name: "timur", message: "hello" };

if ("message" in unionObjectToBeNarrowed) {
  unionObjectToBeNarrowed.message; //No error as the type is narrowed to TypeWithMessage which has the required property message
} else {
  unionObjectToBeNarrowed.surname; //No error as the type is narrowed to TypeWithSurname which has the required property surname
}

//Note: you cannot perform truthiness existence checks like below. Attempting to access a property that might not exist is a type error.

if (unionObjectToBeNarrowed.message) {
  //Throws error as message is not guaranteed to exist on the Union type.
}

//Discriminated Unions: You can also use 'type' property on Types to 'discriminate' against that type in a Union
type BookWithWords = {
  name: string;
  words: string;
  type: "words";
};

type BookWithPictures = {
  name: string;
  pictures: boolean;
  type: "pictures";
};

type Book = BookWithWords | BookWithPictures;

const book: Book =
  Math.random() > 0.5
    ? { name: "WordBook", words: "hello", type: "words" }
    : { name: "PictureBook", pictures: true, type: "pictures" };

if (book.type === "words") {
  book.words; //It has been narrowed to the BookWithWords type because of the if condition
} else {
  book.pictures; //No error here either it was narrowed down to the BookWithPictures type
}

book.type; //Type: 'words' | 'pictures'
book.words; //Error as words is not guaranteed to exist in the Book Union type.

//Intersection Types: just as '|' operator is used to denote 'or' there is the '&' operator typically used with Aliased object types, called the 'Intersection' type.
type ArtWork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: string;
  name: string;
};

type WrittenArt = ArtWork & Writing;
/* 
Equivalent to:
{
  genre: string;
  name: string;
  pages: string;
}
*/

//Intersection types can be combined with Union types. This is useful when you expect all of the Types that are being United to have a certain property.
type Athlete = { name: string } & (
  | { maxWeight: number; type: "powerLifter" }
  | { topSpeed: number; type: "sprinter" }
);

const lifter: Athlete = {
  name: "timur",
  maxWeight: 100,
  type: "powerLifter",
};

const sprinter: Athlete = {
  name: "timur",
  topSpeed: 10,
  type: "sprinter",
};

const noName: Athlete = {
  //Error property name is missing
  topSpeed: 10,
  type: "sprinter",
};

const noTopSpeed: Athlete = {
  //Error property topSpeed is missing
  name: "timur",
  type: "sprinter",
};

//Dangers of Intersection types: DO NOT overuse Intersection types especially with Union types. This will confuse the TypeScript compiler and you whenever errors occur.

//Better version of Athlete type:
type AthleteBase = { name: string };
type PowerLifter = AthleteBase & { maxWeight: number; type: "powerLifter" };
type Sprinter = AthleteBase & { topSpeed: number; type: "sprinter" };
type BetterAthlete = PowerLifter | Sprinter;

const sprinterError: BetterAthlete = {
  //Shows a clearer to understand error as it narrows down from BetterAthlete type to Sprinter and finally to the topSpeed being missing. See error on line 296 it's more confusing.
  name: "timur",
  type: "sprinter",
};

//never: It's easy to misuse Intersection Types and create a impossible type with Primitive types as they cannot be joined together, it's impossible for a value to be multiple primitives at the same time.
//This returns a never type. 'never' keyword and type is referred to as a 'bottom type' or 'empty type'. This means it can have no possible values and can never be reached.
type NotPossible = number & string;

let notNumber: NotPossible = 0; //Error cannot assign number to never
let notString: NotPossible = ""; //Error cannot assign string to never
