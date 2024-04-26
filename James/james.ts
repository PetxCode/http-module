import http, { IncomingMessage, ServerResponse } from "http";
import path from "node:path";
import fs from "node:fs";
import { iDataShape } from "./interface";
import { v4 as uuid } from "uuid";

const port: number = 8888;
const database = path.join(__dirname, "task", "db.json");
const readDB = fs.createReadStream(database, { encoding: "utf8" });

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const headers = {
      "Access-Control-Allow-Origin": "http://localhost:5173",
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
    };

    res.writeHead(200, headers);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (req.url === "/api/post" && req.method === "POST") {
        const { title, description } = JSON.parse(body);

        const writeOBJ: iDataShape = {
          id: uuid(),
          title,
          description,
          date: Date.now(),
          started: false,
          done: false,
        };

        readDB.on("data", (chunk: any) => {
          const readData = JSON.parse(chunk);
          readData.push(writeOBJ);
          const writeDB = fs.createWriteStream(database);
          writeDB.write(JSON.stringify(readData), () => {
            res.end("done");
            // ;
          });
          res.end(JSON.stringify(readData));
        });
      } else if (req.url === "/" && req.method === "GET") {
        readDB.on("data", (chunk: any) => {
          res.end(JSON.parse(JSON.stringify(chunk)));
        });

        // res.end();
      } else if (req.method === "PATCH") {
        console.log();
        let check = req.url?.split("/api/")[1].split("/")[0];

        const id = req.url?.split(`/api/${check}/`)[1];

        if (check === "start") {
          readDB.on("data", (chunk: any) => {
            const data = JSON.parse(chunk);

            const findData = data?.find((el: iDataShape) => {
              return el.id === id;
            });

            findData.started = true;

            const writeDB = fs.createWriteStream(database);
            writeDB.write(JSON.stringify(data), () => {
              res.end("done");
              // ;
            });
          });
        } else if (check === "finish") {
          readDB.on("data", (chunk: any) => {
            const data = JSON.parse(chunk);

            const findData = data?.find((el: iDataShape) => {
              return el.id === id;
            });

            if (findData?.started) {
              findData.done = true;

              const writeDB = fs.createWriteStream(database);
              writeDB.write(JSON.stringify(data), () => {
                res.end("done");
                // ;
              });
            } else {
              res.end("You have to start this task first");
            }
          });
        } else {
          console.log("wrong end point");
        }
      }
    });
  }
);

server.listen(port, () => {
  console.log("server is up");
});
