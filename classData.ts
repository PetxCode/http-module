import { clear, time, timeEnd } from "node:console";

const swap = (arr: number[]) => {
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      // console.log(arr, arr[j], arr[j + 1]);
      if (arr[j] > arr[j + 1]) {
        let mySwap = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = mySwap;
      }
    }
  }
  console.log("**************");
  return arr;
};

const reSwap = (arr: Array<number>): Array<number> => {
  const swapp = (arr: number[], idx: number, idx2: number) => {
    return ([arr[idx], arr[idx2]] = [arr[idx2], arr[idx]]);
  };

  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swapp(arr, j, j + 1);
      }
    }
  }
  console.log("**************");
  return arr;
};

const arr = [1, 3, 0, 8, 9];

time("norm");
console.log(swap(arr));
timeEnd("norm");
console.log("**************");
time("recussive");
console.log(reSwap(arr));
timeEnd("recussive");

clear();

const selection = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let lowest = i;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[lowest]) {
        lowest = j;
      }
    }

    // console.log(arr[lowest]);
    let swap = arr[i];
    arr[i] = arr[lowest];
    arr[lowest] = swap;
  }
  console.log("**************");
  return arr;
};

const reSelect = (arr: Array<number>): Array<number> => {
  const swapp = (arr: number[], idx: number, idx2: number) => {
    return ([arr[idx], arr[idx2]] = [arr[idx2], arr[idx]]);
  };

  for (let i = arr.length - 1; i > 0; i--) {
    let lowest = i;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[lowest]) {
        lowest = j;
      }
    }
    swapp(arr, i, lowest);
  }
  console.log("**************");
  return arr;
};

const arr1 = [9, 0, 1, 7, 8, 3];
console.log(selection(arr1));
console.log(reSelect(arr1));

// time("bubble");
// console.log(swap(arr));
// timeEnd("bubble");
// console.log("**************");
// time("selection");
// console.log(selection(arr));
// timeEnd("selection");
