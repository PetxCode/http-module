import http, { IncomingMessage, ServerResponse } from "node:http";
import https from "node:https";
import path from "node:path";
import fs from "node:fs";
import stream from "node:stream";

const port: number = 2233;

interface iPropsData {
  id: number;
  name: string;
}
interface iProps {
  status: number;
  success: boolean;
  message: string;
  data: null | iPropsData[];
}
const myData: iPropsData[] = [
  { id: 1, name: "Peter" },
  { id: 2, name: "James" },
  { id: 3, name: "Terry" },
];

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    // https.get(
    //   {
    //     host: "api.github.com",
    //     method: "GET",
    //     path: "user/petxcode",
    //     headers: {
    //       "user-agent": "node.js",
    //     },
    //   },
    //   (resp) => {
    //     let body: string = "";

    //     resp.on("data", (chunk) => {
    //       body += chunk;
    //     });

    //     resp.on("end", () => {
    //       let result = JSON.parse(body);
    //       let pathFIle = path.join(__dirname, "data", "save.json");

    //       fs.writeFileSync(pathFIle, JSON.stringify(result));
    //     });
    //   }
    // );

    // https.get(
    //   {
    //     host: "api.github.com",
    //     path: "/users/petxcode",
    //     method: "GET",
    //     headers: {
    //       "user-agent": "node.js",
    //     },
    //   },
    //   (resp) => {
    //     let body = "";

    //     resp.on("data", (chunk) => {
    //       body += chunk.toString();
    //     });

    //     resp.on("end", () => {
    //       console.log(JSON.parse(body));
    //     });
    //   }
    // );

    const URL: string =
      "https://api.nasa.gov/planetary/apod?api_key=1vQha29IYNyn1yhud8t5PniF4NNuwkyjzf9NLEXB";

    // https.get(URL, (response) => {
    //   let body = "";

    //   response.on("data", (chunk) => {
    //     body += chunk.toString();
    //   });

    //   response.on("end", () => {
    //     let result = JSON.parse(body).url;

    //     https.get(result, (response) => {
    //       let img = new stream.Transform();

    //       response.on("data", (chunk) => {
    //         img.push(chunk);
    //       });

    //       response.on("end", () => {
    //         let file = path.join(__dirname, "img", "pix1.jpg");

    //         fs.writeFile(file, img.read(), () => {
    //           console.log("done");
    //         });
    //       });
    //     });
    //   });
    // });

    let body = [];

    let data: iProps = {
      status: 404,
      message: "bad",
      success: false,
      data: null,
    };

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      if (req.url === "/" && req.method === "GET") {
        data.status = 200;
        data.message = "ok";
        data.success = true;
        data.data = myData;
      }

      res.end(JSON.stringify(data));
    });

    res.setHeader("Content-Type", "application/json");
  }
);

server.listen(port, () => {
  console.log("server started");
});
