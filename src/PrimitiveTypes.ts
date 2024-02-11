export {};

//Primitive Types and Type inference
let nullValue = null;
let undefinedValue = undefined;
let boolean = true;
let string = "string";
let number = 1;
let bigint = 1n;
let symbol = Symbol();

//Assignability: The initially assigned value is the type for that variable.
boolean = "Hello";

//Any variable without assignment is set to 'any' type and type is inferred as values are set to it. DON'T EVER DO THIS. Defeats the point of TypeScript.
let anyValue;

anyValue = "hello";
anyValue.toUpperCase();

anyValue = 10;
anyValue.toPrecision(1);

anyValue.toUpperCase();

//Type Annotations: You can declare the type of a variable without an initial assignment.
let stringValue: string;
stringValue = "hello";
stringValue = 10; //Shows Error as type number cannot be assigned to string.

//Type Shapes: Typescript knowns what member properties should exist on an object. For non primitives always best practice assign type.
//Best practice to set return type for a return value of a function.

let objectValue = { name: "Timur", age: 26 };
objectValue.address; //Shows error as address doesn't exist on objectValue type.

//Unions: Expanding a values allowed type to two or more possible types. Pipe | operator is used to combine types.
let numberOrString = Math.random() > 0.5 ? "hello" : 10;

let numberOrNull: number | null = null;
if (Math.random() > 0.5) {
  numberOrNull = 10;
}

//Union Properties: Only member properties that exist on all possible types can be accessed.
let numberOrString1 = Math.random() > 5 ? "hello" : 10;

numberOrString1.toString();

numberOrString1.toUpperCase(); //Shows error as upperCase doesn't exist on number type.
numberOrString1.toFixed(); //Shows error as toFixed doesn't exist on string type.

//Narrowing: Assignment narrowing, when you assign a value to a variable that was declared with a union, it is narrowed to that type. This is known as a 'type guard'.
let dualTypeValue: number | string;
let dualTypeValue2: number | string = "hello";

dualTypeValue = "hello";

dualTypeValue.toUpperCase();
dualTypeValue.toFixed(); //Shows error as dualTypeValue is set to a string and toFixed doesn't exist on string type.

dualTypeValue2.toUpperCase();
dualTypeValue2.toFixed(); //Shows error as dualTypeValue2 is initially set to a string and toFixed doesn't exist on string type.

//Narrowing: Conditional checks, type can be narrowed by checking equality between a known value and the variable.
let dualTypeValue3 = Math.random() > 0.5 ? "hello" : 10;

if (dualTypeValue3 === "hello") {
  dualTypeValue3.toUpperCase();
}

dualTypeValue3.toUpperCase(); //Shows error as dualTypeValue3 is not guaranteed to be a string and toUpperCase only exists on strings.

//Narrowing: Typeof checks can be used in addition to direct value checks.
let dualTypeValue4 = Math.random() > 0.5 ? "hello" : 10;

if (typeof dualTypeValue4 === "string") {
  dualTypeValue4.toUpperCase();
}

if (!(typeof dualTypeValue4 === "string")) {
  dualTypeValue4.toFixed();
} else {
  dualTypeValue4.toUpperCase();
}

typeof dualTypeValue4 === "string"
  ? dualTypeValue4.toUpperCase()
  : dualTypeValue4.toFixed();

//Literal Types: Are used when you want your type to be more specific than a general type eg 'number' or 'string'. When declared with 'const' variable is set to 'Literal' type.
let notLiteral = "hello"; //Primitive types are a Union of every possible combination of values eg 'a', 'aa', 'aaa', etc.
const isLiteral = "hello";

//Literal Types: Unions can mix 'literal' and 'primitive' types.
let literalOrPrimitive: number | "Hello" | "Goodbye";

literalOrPrimitive = 10;
literalOrPrimitive = "Hello";

literalOrPrimitive = "true"; //Shows error as 'true' is not part of the literalOrPrimitive types.

//Strict Null Checking: Stops 'null' or 'undefined' from being assigned to a variable with any other type or properties being accessed in a potentially undefined value. Stops a potential crash.
// This can be changed in the 'tsconfig.json' file. C++ and Java allow this behaviour.
const name: string = null; //Shows error as 'null' is not assignable to 'string'.

let stringMaybe = Math.random() > 0.5 ? "hello" : undefined;
stringMaybe.toUpperCase(); //Shows error as stringMaybe could be undefined and toUpperCase doesn't exist on undefined type.

//Truthiness Narrowing: All values are truthy in JS except 0, -0, 0n, "", null, undefined, NaN. Types can be narrowed with a truthiness check. Not the best practice.
let stringMaybe2 = Math.random() > 0.5 ? "hello" : undefined;

if (stringMaybe2) {
  stringMaybe2.toUpperCase();
}

stringMaybe2.toUpperCase(); //Shows error as stringMaybe2 could be undefined and toUpperCase doesn't exist on undefined type.

stringMaybe2 && stringMaybe2.toUpperCase();
stringMaybe2?.toUpperCase(); //checks if the value is not undefined before calling the method.

//Truthiness Narrowing: Cannot determine the specific type of falsy values.
let stringOrFalse = Math.random() > 0.5 && "hello";

if (stringOrFalse) {
  stringOrFalse; // Type: string
} else {
  stringOrFalse; // Type: false | string. Could be "" which is considered falsy.
}

//Variables Without Initial Values: Get set to undefined, if you annotate a variable and try to access it before assigning value special error is shown.
let uninitialisedString: string;

uninitialisedString.length; //Shows error as uninitialisedString has not yet been initialised.

uninitialisedString = "hello";
uninitialisedString.length;

//does not work is type annotation includes 'undefined'. Both cases okay.
let stringOrUndefined: string | undefined;

stringOrUndefined?.length;

stringOrUndefined = "hello";
stringOrUndefined.length;

//Type Aliases: Can be used to create custom types, can be used to eliminate repetition. Purely in TS does not get compiled into output JS.
let rowData: boolean | number | string | null | undefined;
let rowData1: boolean | number | string | null | undefined;
let rowData2: boolean | number | string | null | undefined;

type RowData = boolean | number | string | null | undefined;

let rowData3: RowData;
let rowData4: RowData;
let rowData5: RowData;

//Type Aliases: Aliases can reference other aliases. Useful when creating a superset of types.
type Id = number | string;
type IdMaybe = Id | undefined | null;
