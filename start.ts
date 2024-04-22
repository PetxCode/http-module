import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import stream from "node:stream";

import http, { IncomingMessage, ServerResponse } from "node:http";

const port: number = 5577;

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.writeHead(200);

    // const URL: string = "https://api.github.com/users/petxcode";

    https.get(
      {
        host: "api.github.com",
        path: "/users/petxcode",
        method: "GET",
        headers: {
          "user-agent": "node.js",
        },
      },
      (data) => {
        let body = "";

        data.on("data", (chunk) => {
          body += chunk.toString();
        });

        data.on("end", () => {
          let pathFile = path.join(__dirname, "git", "peter.json");

          fs.writeFile(pathFile, JSON.stringify(JSON.parse(body)), () => {
            let result: any = JSON.parse(body);
            const img = new stream.Transform();

            https.get(result.avatar_url, (data) => {
              data.on("data", (chunk) => {
                img.push(chunk);
              });

              data.on("end", () => {
                console.log(img);
                let pathFile = path.join(__dirname, "git", "peter.jpg");

                fs.writeFile(pathFile, img.read(), () => {
                  res.end("done writing");
                });
              });
            });
          });
        });
      }
    );
  }
);

server.listen(port, () => {
  console.log("server connected🚀🚀🚀");
});
