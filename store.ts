import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import stream from "node:stream";
import http, { IncomingMessage, ServerResponse } from "node:http";

const port: number = 5577;
const URL: string = "https://fakestoreapi.com/products";

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.writeHead(200);
    const storeData = path.join(__dirname, "store", "store.json");

    // endpoint to capture store data
    if (req.url === "/api/capture" && req.method === "GET") {
      https.get(URL, (data) => {
        let body = "";

        data.on("data", (chunk) => {
          body += chunk.toString();
        });

        data.on("end", () => {
          fs.writeFile(storeData, JSON.stringify(JSON.parse(body)), () => {
            res.end("success");
          });
        });
      });
    }

    // read data from local storage

    if (req.url === "/api/store" && req.method === "GET") {
      const read = fs.createReadStream(storeData);

      read.on("data", (chunk) => {
        res.end(chunk);
      });
    } else {
      const URLData: string = req.url!;
      let num: any = URLData?.split("store")[1]?.split("/")[1];
      const read = fs.createReadStream(storeData);

      read.on("data", (chunk) => {
        const readData = JSON.parse(chunk.toString());
        console.log(num);

        const findData = readData?.find((el: any) => {
          return el.id === parseInt(num);
        });

        res.end(JSON.stringify(findData));
      });
      //   res.end(num);
    }
  }
);

server.listen(port, () => {
  console.log("store-server connected🚀🚀🚀");
});
