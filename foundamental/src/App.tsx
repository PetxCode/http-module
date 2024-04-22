import { FC, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import pix from "./assets/1.png";
import pix1 from "./assets/2.png";
import pix2 from "./assets/3.jpg";
import pix3 from "./assets/4.png";
import pix4 from "./assets/5.jpg";

const App: FC = () => {
  const myRef: any = useRef(null);
  const myRef1: any = useRef(null);
  const myRef2: any = useRef(null);
  const myRef3: any = useRef(null);
  const myRef4: any = useRef(null);

  const [value, setValue] = useState(0);
  const image = [pix, pix1, pix2, pix3, pix4];

  let x: number = 3 * 5;

  const increaseCount = () => {
    setValue((el: number) => {
      return el + 1;
    });
  };

  const decreaseCount = () => {
    if (value <= 0) {
      return setValue(image.length - 1);
    } else {
      setValue((el: number) => {
        return el - 1;
      });
    }
  };

  // const timer = setTimeout(() => {
  //   console.log("Peter");

  //   clearTimeout(timer);
  // }, 3000);

  const colorSet = [
    "orange",
    "lightgray",
    "lightgray",
    "lightgray",
    "lightgray",
  ];

  const colorSet1 = [
    "lightgray",
    "orange",
    "lightgray",
    "lightgray",
    "lightgray",
  ];

  const colorSet2 = [
    "lightgray",
    "lightgray",
    "orange",
    "lightgray",
    "lightgray",
  ];

  const colorSet3 = [
    "lightgray",
    "lightgray",
    "lightgray",
    "orange",
    "lightgray",
  ];

  const colorSet4 = [
    "lightgray",
    "lightgray",
    "lightgray",
    "lightgray",
    "orange",
  ];

  // myRef!.current!.style.backgroundColor = colorSet[value % colorSet.length];
  // myRef1!.current!.style.backgroundColor = colorSet1[value % colorSet1.length];
  // myRef2!.current!.style.backgroundColor = colorSet2[value % colorSet2.length];
  // myRef3!.current!.style.backgroundColor = colorSet3[value % colorSet3.length];
  // myRef4!.current!.style.backgroundColor = colorSet4[value % colorSet4.length];

  const [val, setVal] = useState<Array<number>>([]);
  const [numb, setNumb] = useState<number>(0);
  const [numb1, setNumb1] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const addValue = (value: number) => {
    // return setVal([...val, value])
    return val.push(value);
  };

  useEffect(() => {
    console.log(numb);
    console.log(numb1);
    console.log("value: ", val);
    setResult(numb + numb1);

    if (val.length !== 0) {
      setVal([]);
    }
  }, [result]);

  return (
    <div>
      <p>{value}</p>
      <p></p>
      <Contain>
        <Div>
          <Box onClick={decreaseCount}>-</Box>
          <Value>{value % image.length}</Value>
          <Box bg="r" onClick={increaseCount}>
            +
          </Box>
        </Div>
      </Contain>

      <br />
      <br />

      {/* 
      <Contain>
        <ImageBox>
          <Image src={image[value % 4]} />
        </ImageBox>
      </Contain> */}

      <Contain>
        <Circle ref={myRef} />
        <Circle ref={myRef1} />
        <Circle ref={myRef2} />
        <Circle ref={myRef3} />
        <Circle ref={myRef4} />
      </Contain>
      <br />
      <Contain>{result}</Contain>
      <Contain>
        <Display>
          {numb && `${numb} +`} {numb1 > 0 && `${numb1}=`}{" "}
          {result > 0 && result}
        </Display>
      </Contain>
      <Contain>
        <Bx
          onClick={() => {
            addValue(1);
          }}
        >
          1
        </Bx>
        <Bx
          onClick={() => {
            addValue(2);
          }}
        >
          2
        </Bx>
        <Bx
          onClick={() => {
            addValue(3);
          }}
        >
          3
        </Bx>
        <Bx
          onClick={() => {
            setNumb(parseInt(val.join("")));
            setVal([]);

            console.log(val);
          }}
        >
          +
        </Bx>
        <Bx
          onClick={() => {
            setNumb1(parseInt(val.join("")));
            setResult(numb + numb1);
          }}
        >
          =
        </Bx>
      </Contain>
    </div>
  );
};

export default App;

const Display = styled.div`
  font-size: 10px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Bx = styled.div`
  width: 15px;
  height: 15px;
  background-color: #e2e2e2;
  color: #08183a;
  border: 1px solid gray;
  cursor: pointer;
  font-size: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
`;

const Circle = styled.div`
  width: 5px;
  background-color: lightgray;
  height: 5px;

  border-radius: 50%;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageBox = styled.div`
  border-radius: 3px;
  width: 90%;
  height: 40vh;
  overflow: hidden;
`;

const Value = styled.div``;

const Box = styled.div<{ bg?: string }>`
  margin: 0 30px;
  border-radius: 3px;
  padding: 2px 15px;
  cursor: pointer;
  background-color: ${({ bg }) => (bg ? "green" : "red")};
  color: white;
`;

const Div = styled.div`
  width: 90%;
  height: 25vh;
  border: 1px solid silver;
  margin: 4px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
`;
