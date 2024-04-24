import { clear, log } from "node:console";
import http, { IncomingMessage, ServerResponse } from "node:http";
import https from "node:https";
import path from "node:path";
import fs from "node:fs";
import { v4 as uuid } from "uuid";

const port: number = 2255;
const app: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const headers = {
      "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
      /** add other headers as per requirement */
    };

    res.writeHead(200, headers);

    let myPath = path.join(__dirname, "student", "student.json");
    const read = fs.createReadStream(myPath, { encoding: "utf8" });

    if (req.url === "/api/read" && req.method === "GET") {
      read.on("data", (chunk) => {
        res.end(JSON.parse(JSON.stringify(chunk)));
      });
    } else if (req.url === "/api/post" && req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        const { name, image } = JSON.parse(body);
        read.on("data", (chunk) => {
          const result = JSON.parse(JSON.parse(JSON.stringify(chunk)));
          const { data } = result;

          const obj = {
            id: uuid(),
            name,
            image,
            date: Date.now(),
          };

          data.push(obj);
          console.log(result);
          const write = fs.createWriteStream(myPath);

          write.write(JSON.stringify(result), () => {
            res.end("done writing result");
          });
        });
      });
    }
  }
);

app.listen(port, () => {
  clear();
  console.log();
  console.log("server listening on port");
});
