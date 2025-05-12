//* Primitives: number, string, boolean
let age: number;
age = 23;

const userName: string = "Dat Phan";

const isStudent: boolean = true;

//* More complex types: arrays, objects
let hobbies: string[];

hobbies = ["Travel", "Cooking"];

type Person = {
    name: string;
    age: number;
};

let person: Person;

person = {
    name: "Dat Phan",
    age: 23,
};

let people: Person[];

let course: string | number = "React course";

course = 123;

//* Function types, parameters
function add(a: number, b: number): number {
    return a + b;
}

function print(value: any) {
    console.log(value);
}

//* Generics
function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const updatedArray = insertAtBeginning([1, 2, 3], -1);
const stringArray = insertAtBeginning(["a", "b", "c"], "d");
