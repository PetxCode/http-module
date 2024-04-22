import fs from "node:fs";
import path from "node:path";

let count = path.join(__dirname, "data", "count.txt");
let fsCountCopy = path.join(__dirname, "data", "fsCountCopy.txt");
let countCopy = path.join(__dirname, "data", "countCopy.txt");
let countCopyPipe = path.join(__dirname, "data", "countCopyPipe.txt");

let myPath1 = path.join(__dirname, "data", "text1.txt");
let myPath2 = path.join(__dirname, "data", "text2.txt");

// const file = fs.writeFile(myPath1, "This is Peter, from CodeLab", () => {
//   console.log("done writing");
// });

// let read = fs.createReadStream(myPath1, {
//   //   encoding: "utf-8",
//   highWaterMark: 2,
// });
// let write = fs.createWriteStream(myPath2);

// read.on("data", (chunk) => {
//   console.log(chunk);

//   write.write(chunk);
// });

const countWrite = (x: number) => {
  fs.open(count, "w", (err: any, data: any) => {
    if (err) throw err;

    for (let i = 0; i < x; i++) {
      fs.write(data, ` ${i} `, () => {});
    }

    console.log("done writing");
  });
};
// countWrite(1000000);

// fs.readFile(count, "utf-8", (err: any, data: any) => {
//   if (err) throw err;
//   console.time("fs copy");

//   //   console.log(data);
//   fs.writeFile(fsCountCopy, data, () => {
//     console.log("complete copy");
//     console.timeEnd("fs copy");
//   });
// });

let readData = fs.createReadStream(count, {
  //   encoding: "utf8",
  highWaterMark: 16384,
});
let writeData = fs.createWriteStream(countCopy);

let writeDataPipe = fs.createWriteStream(countCopyPipe);

// console.time("streaming copy");
// readData.on("data", (chunk) => {
//   console.log(chunk);
//   writeData.write(chunk);
// });
// console.timeEnd("streaming copy");

// console.time("streaming with PIPE");
// fs.createReadStream(count).pipe(fs.createWriteStream(countCopyPipe));
// console.timeEnd("streaming with PIPE");
import { clear, log } from "node:console";
let myUser: any = [];

if (!fs.existsSync("user")) {
  fs.mkdir("user", () => {
    console.log("done creating user");
  });

  let myPath = path.join(__dirname, "user", "user.json");

  let id = 0;
  Array.from({ length: 100000 }, () => {
    return myUser.push({
      id: id + 1,
      name: `${Math.floor(Math.random() * 100000)}`,
      matNo: Math.floor(Math.random() * 10000000000),
    });
  });
  fs.writeFile(myPath, JSON.stringify(myUser), () => {
    console.log("copied user");
  });
}

clear();
import http, { IncomingMessage, ServerResponse } from "node:http";

const port: number = 2211;
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    // res.writeHead(200, { "Content-Type": "application/json" });

    const data = [
      { id: 1, name: "Peter", matNo: Math.floor(Math.random() * 1000) },
    ];

    let readPath = path.join(__dirname, "user", "user.json");

    // loading with FS

    // fs.readFile(readPath, "utf-8", (err: any, data: any) => {
    //   if (err) throw err;
    //   let readData = JSON.parse(JSON.stringify(data));

    //   res.write(readData);
    //   res.end();
    // });

    // loading with Stream
    let read = fs.createReadStream(readPath, { encoding: "utf8" });
    // let write = fs.createWriteStream(writePath)

    // read.on("data", (chunk: string | Buffer) => {
    //   res.write(JSON.parse(JSON.stringify(chunk)));
    //   res.end();
    // });

    // loading with HTML
    res.writeHead(200, { "Content-Type": "text/html" });
    let readHTMLPath = path.join(__dirname, "web", "index.html");

    // fs.readFile(readHTMLPath, (err: any, data: any) => {
    //   if (err) throw err;

    //   res.write(data);
    //   res.end();
    // });

    let readStream = fs.createReadStream(readHTMLPath);
    readStream.on("data", (chunk) => {
      res.write(chunk);
      res.end();
    });

    // const { url, method } = req;

    // if (method === "GET" && url === "/api") {
    //   console.log("This is GET request");

    //   let pathFile = path.join(__dirname, "web", "index.htnl");

    //   let read = fs.createReadStream(pathFile);

    //   read.on("data", (chunk) => {
    //     res.write(chunk);
    //   });
    // } else if (method === "POST") {
    //   console.log("This is POST request");
    // }

    // res.end();
  }
);

server.listen(port, () => {
  log(`server is listening on port: ${port}`);
});
