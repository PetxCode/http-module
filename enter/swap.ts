// const swap = (arr: number[]) => {
//   for (let i = arr.length; i > 0; i--) {
//     for (let j = 0; j < i - 1; j++) {
//       console.log(arr, arr[j], arr[j + 1]);
//       if (arr[j] > arr[j + 1]) {
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }

import { clear, log } from "console";
import { IncomingMessage, ServerResponse } from "http";

//   return arr;
// };

// const bub = (arr: number[]) => {
//   const swap = (arr: number[], idx1: number, idx2: number) => {
//     return ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
//   };

//   for (let i = arr.length; i > 0; i--) {
//     for (let j = 0; j < i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         swap(arr, j, j + 1);
//       }
//     }
//   }
// };

// const mySwap = (arr: number[]) => {
//   for (let i = arr.length; i > 0; i--) {
//     for (let j = 0; j < i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp;
//       }
//     }
//   }
//   return arr;
// };

// const mainBUB = (arr: number[]) => {
//   const swap = (arr: number[], idx: number, idx1: number) => {
//     return ([arr[idx], arr[idx1]] = [arr[idx1], arr[idx]]);
//   };

//   for (let i = arr.length; i > 0; i--) {
//     for (let j = 0; j < i - 1; j++) {
//       if (arr[j] > arr[j + 1]) {
//         swap(arr, j, j + 1);
//       }
//     }
//   }

//   return arr;
// };

// // console.log(mySwap([15, 20, 10, 2, 1]));
// // console.log(mainBUB([15, 20, 10, 2, 1]));

// const selected = (arr: number[]) => {
//   for (let i = 0; i < arr.length; i++) {
//     let lowest = i;

//     for (let j = i + 1; j < arr.length; j++) {
//       if (arr[j] < arr[lowest]) {
//         lowest = j;
//       }
//     }

//     let temp = arr[i];
//     arr[i] = arr[lowest];
//     arr[lowest] = temp;
//   }
//   return arr;
// };

// console.log(selected([15, 20, 10, 2, 1]));
clear();

const swap = (arr: number[]) => {
  let check = true;
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      console.log(arr, arr[j], arr[j + 1]);
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        check = false;
      }

      //   if (check) break;
    }
  }

  return arr;
};

const mainSwap = (arr: number[]) => {
  const swap = (arr: number[], idx: number, idx1: number) => {
    return ([arr[idx], arr[idx1]] = [arr[idx1], arr[idx]]);
  };

  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }

  return arr;
};

// console.log(mainSwap([4, 1, 7, 3, 9]));

const select = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[lowest]) {
        lowest = j;
      }
    }
    let temp = arr[i];
    arr[i] = arr[lowest];
    arr[lowest] = temp;
  }

  return arr;
};

// console.log(select([9, 4, 6, 8]));

let arr = [3, 2];

const mySwap = (arr: number[]) => {
  if (arr[0] > arr[1]) {
    let temp = arr[0];
    arr[0] = arr[1];
    arr[1] = temp;
  }

  return arr;
};

// console.log(mySwap(arr));

import http from "node:http";

const port: number = 2299;

interface iPropsData {
  id: number;
  name: string;
}

interface iProps {
  message: string;
  success: boolean;
  data: iPropsData[] | null;
}

const app = http.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    let db: iProps = {
      message: "failed",
      success: false,
      data: null,
    };

    let body = "";
    req.on("data", (chunk) => {
      console.log(chunk);
      body += chunk;

      console.log(body);
    });

    req.on("end", () => {
      console.log("show me: ", JSON.parse(body));
      res.end(JSON.parse(JSON.stringify(body)));
    });

    // res.writeHead(200);
    // res.end("started");
  }
);

app.listen(port, () => {
  console.log("awesome app listening");
});
