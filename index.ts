// import { log } from "console";

// class Nodes {
//   value: number;
//   next: Nodes | null;

//   constructor(value: number) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Stack {
//   first: Nodes | null;
//   last: Nodes | null;
//   length: number;

//   constructor() {
//     this.first = null;
//     this.last = null;
//     this.length = 0;
//   }

//   push(value: number) {
//     let node = new Nodes(value);

//     if (!this.first) {
//       this.first = node;
//       this.last = node;
//     } else {
//       let prev = this.first;
//       this.first = node;
//       node.next = prev;
//     }

//     this.length++;
//     return this;
//   }

//   pop() {
//     if (!this.first) return undefined;

//     if (this.last === this.first) {
//       return;
//     } else {
//       let prev = this.first;

//       this.first = this.first.next;

//       this.length--;
//       return prev.value;
//     }
//   }

//   print() {
//     let print: number[] = [];

//     let current = this.first;

//     while (current) {
//       print.push(current.value);
//       current = current.next;
//     }

//     return print;
//   }
// }

// let stack = new Stack();

// stack.push(9);
// stack.push(3);
// stack.push(8);
// stack.push(4);

// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();
// stack.pop();

// console.log(stack);
// console.log(stack.print());

// console.clear();

// class Noded {
//   value: number;
//   next: Noded | null;

//   constructor(value: number) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Queue {
//   first: null | Noded;
//   last: null | Noded;
//   length: number;

//   constructor() {
//     this.first = null;
//     this.last = null;
//     this.length = 0;
//   }
//   push(value: number) {
//     let node = new Noded(value);

//     if (!this.first) {
//       this.first = node;
//       this.last = node;
//     } else {
//       this.last!.next = node;
//       this.last = node;
//     }
//     this.length++;
//     return this;
//   }

//   pop() {
//     if (!this.first) return undefined;

//     if (this.last === this.first) {
//       return;
//     } else {
//       let prev = this.first;

//       this.first = this.first.next;

//       this.length--;
//       return prev.value;
//     }
//   }

//   print() {
//     let print: number[] = [];

//     let current = this.first;

//     while (current) {
//       print.push(current.value);
//       current = current.next;
//     }

//     return print;
//   }
// }

// let queue = new Queue();

// queue.push(7);
// queue.push(3);
// queue.push(8);
// queue.push(1);

// queue.pop();
// queue.pop();
// queue.pop();
// queue.pop();
// queue.pop();
// queue.pop();

// console.log(queue);
// console.log(queue.print());

const count = (x: number) => {
  for (let i = x; i > 0; i--) {
    console.log(i);
  }

  console.log("Done");
};

// count(5);

const recussive = (x: number) => {
  if (x <= 0) {
    console.log("Done");
    return;
  }

  console.log(x);
  x--;

  recussive(x);
};

// recussive(5);

const sumRange: any = (num: number) => {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
};
console.clear();

// console.log(sumRange(7));

// 4!

// const fact = (x: number) => {
//   let total: number = 1;

//   for (let i = x; i > 1; i--) {
//     total *= i;
//   }

//   return total;
// };

// console.log(fact(4));

// const facto: any = (x: number) => {
//   if (x === 1) return 1;

//   return x * facto(x - 1);
// };

// console.log(facto(1));

// let conuting = (x: number) => {
//   for (let i = x; i > 0; i--) {
//     console.log(i);
//   }

//   console.log("Done counting...");
// };
// console.clear();

// console.log(conuting(3));

// const reCount: any = (x: number) => {
//   if (x <= 0) {
//     console.log("done counting");
//   } else {
//     console.log(x);
//     x--;
//     reCount(x);
//   }
// };

// console.log(reCount(5));

// const factorial: any = (x: number) => {
//   let total: number = 1;

//   for (let i = x; i > 0; i--) {
//     total *= i;
//   }

//   return total;
// };

// console.log(factorial(5));
// console.log(5 * 4 * 3 * 2 * 1);

// const reFactorial: any = (x: number) => {
//   if (x === 1) return 1;

//   return x * reFactorial(x - 1);
// };

// console.log(reFactorial(5));

import fs from "fs";
import fsP from "fs/promises";
import path from "path";
import http from "http";

let file = path.join(__dirname, "test.txt");
let file2 = path.join(__dirname, "test2.txt");
let file3 = path.join(__dirname, "test3.txt");

const writeFile = (x: number) => {
  fs.open(file, "w", (err: any, data: any) => {
    for (let i = 0; i < x; i++) {
      fs.write(data, `${i} `, () => {});
    }

    console.log("done writing");
  });
};

// writeFile(10000);

const newWrite = async (x: number) => {
  const data = await fsP.open(file, "w");

  for (let i = 0; i < x; i++) {
    await data.write(`${i} `);
  }
};

// newWrite(100);

let read = fs.createReadStream(file, {
  encoding: "utf8",
  highWaterMark: 4,
});

let write = fs.createWriteStream(file3);

// read.on("data", (chunk) => {
//   console.log(chunk);
// });

// fs.createReadStream(file).pipe(write);

// const buff = Buffer.alloc(16384, 10);

// console.log(buff);

// const server = http.createServer(
//   (
//     req: http.IncomingMessage,
//     res: http.ServerResponse<http.IncomingMessage>
//   ) => {
//     res.setHeader("Content-Type", "application/json");
//     res.writeHead(200);

//     // res.end("Welcome to the CodeLab");
//     res.write("Welcome to the CodeLab");

//     res.end();
//   }
// );

// server.listen(2000, () => {
//   console.log("ready to connect");
// });
