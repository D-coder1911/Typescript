type numOrStrType = number | string;
type myBoolean = true | false;
type CarType = {
  name: string;
  price: number;
  maxSpeed: number;
  color?: string;
};
interface CarInterface {
  name: string;
  price: number;
  maxSpeed: number;
  color?: string;
}

// union types
const mixedArr: numOrStrType[] = [12, "ok", 456, "mercedes"];

let nameOrAge: numOrStrType = "Alex";

nameOrAge = 24;

// let car: CarType = {
//   name: "Mercedes",
//   price: 120000,
//   maxSpeed: 400,
// };

// let car2: CarInterface = {
//   maxSpeed: 230,
//   name: "toyota",
//   price: 23000,
// };

// topshiriq
// findMaxEl nomli funksiya yozilsin
// bu funksiya array'da numbers yoki string'larni qabul qiladi
// agar argument sifatida number[] kelsa eng katta raqam qaytarilsin
// aks holda eng uzun string qaytsin
// argument va funksiya return type'lari type alias orqali yaratilsin

// findMaxEl([12,23,34,45,56])  => 56
// // findMaxEl(["ok", "test", "testttttt"]) => "testttttt"

// const findMaxEl = (arr: number[] | string[]): number | string => {
//   if (arr.length === 0) {
//     return "Array bo'sh!";
//   }

//   if (typeof arr[0] === "number") {
//     return (arr as number[]).sort((a: number, b: number) => a - b).at(-1);
//   }

//   if (typeof arr[0] === "string") {
//     let longestStr: string = arr[0];
//     arr.forEach((el) => {
//       if (el.length > longestStr.length) {
//         longestStr = el;
//       }
//     });
//     return longestStr;
//   }
// };

// console.log(findMaxEl([12, 23, 34, 45]));
// console.log(findMaxEl(["ok", "okkk", "okkkkkkk"]));

// Type vs Interface

type Vehicle = {
  name: string;
};

type Car = Vehicle & {
  price: number;
};

type Car2 = {
  brand: string;
};

interface VehicleInterface {
  name: string;
}

interface CarInterface extends VehicleInterface {
  readonly brand: string;
}

const myCar: CarInterface = {
  brand: "sadac",
  maxSpeed: 1200,
  name: "afdaa",
  price: 123456,
  color: "white",
};

// myCar.brand = "NEW VALUE";

function logConsole<T>(arg: T): T {
  console.log(arg);
  return arg;
}

logConsole("string");
logConsole(12);
logConsole(true);
logConsole(123456n);
logConsole(null);
logConsole(undefined);
logConsole({ name: "Tom" }).name;

const mergeArrays = <T1, T2>(arr1: T1[], arr2: T2[]): (T1 | T2)[] => {
  return [...arr1, ...arr2];
};

console.log(mergeArrays([1, 2, 3], ["ali", "vali", "akbar"]));

interface Person<T> {
  id: T;
  name: string;
  age: number;
  getId: () => T;
}

const user1: Person<string> = {
  age: 45,
  id: "asckhacsc",
  name: "user 1",
  getId() {
    return this.id;
  },
};

const user2: Person<number> = {
  age: 45,
  id: 1372312,
  name: "user 1",
  getId() {
    return this.id;
  },
};

//   1-misol
const maxArr = <T>(arr: T[]): T => {
  return Math.max(...(arr as number[])) as T;
};

console.log(maxArr([2, 34, 6]));

// 2-misol
const mergedObejects = <T, U>(obj1: T, obj2: U): T & U => {
  return { ...obj1, ...obj2 };
};

// 3-misol
// interface Custom<T> {
//     key: T
// }