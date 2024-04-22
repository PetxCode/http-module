import fs from "node:fs";
import path from "node:path";

import http, { IncomingMessage, ServerResponse } from "node:http";

const port: number = 5577;

const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.writeHead(200);
  }
);

server.listen(port, () => {
  console.log("server connected🚀🚀🚀");
});
