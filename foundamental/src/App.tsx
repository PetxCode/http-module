import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

interface iPropsData {
  name?: string;
  id?: number;
  date?: Date;
}

interface iProps {
  val?: any;
  setVal?: any;
  setStud?: any;
  setData?: any;
  data?: any;
}

const Input: FC<iProps> = ({ setVal, setStud, data, setData }) => {
  const [text, setText] = useState<string>("");
  const [students, setStudents] = useState<Array<{}>>([]);

  useEffect(() => {
    console.log(students);
  }, [students]);

  return (
    <div>
      <Text>Student Reg. Form</Text>
      <InputHolder>
        <InputLabel>Enter Name</InputLabel>
        <InputValue
          placeholder="Enter Name"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
            setVal(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            if (text !== "") {
              setStudents([
                ...students,
                { id: students.length - 1, name: text, data: Date.now() },
              ]);

              setStud({ id: students.length++, name: text, data: Date.now() });

              setData([
                ...data,
                {
                  id: students.length++,
                  name: text,
                  data: Date.now(),
                },
              ]);
              setText("");
            }
          }}
        >
          Add Student
        </Button>
      </InputHolder>
    </div>
  );
};

const Display: FC<iProps> = ({ data }) => {
  useEffect(() => {
    console.log("reading data from Display: ", data);
  }, [data]);

  return (
    <Container>
      {data?.length > 0 ? (
        <div>
          {data?.map((props: iPropsData) => {
            return (
              <Holder key={props.id}>
                <Avatar
                  src={"https://avatars.githubusercontent.com/u/71887594?v=4"}
                  alt="image"
                />
                <Content>
                  <Context>{props.id}</Context>
                  <ContextName>{props?.name}</ContextName>
                  <ContextDate>{moment(props.date).fromNow()}</ContextDate>
                </Content>
              </Holder>
            );
          })}
        </div>
      ) : (
        <Holder>No student yet</Holder>
      )}
    </Container>
  );
};

const App = () => {
  const [data, setData] = useState<Array<iPropsData>>([] as iPropsData[]);
  const [val, setVal] = useState<string>("");

  const [stud, setStud] = useState<iPropsData>({} as iPropsData);

  return (
    <div>
      <Input setVal={setVal} setStud={setStud} setData={setData} data={data} />

      <Display data={data} />

      {/* <div>{stud?.name}</div> */}
    </div>
  );
};

export default App;

const Container = styled.div`
  display: flex;
`;

const ContextDate = styled.div`
  font-size: 12px;
`;

const ContextName = styled.div`
  font-size: 25px;
  font-weight: 600;
  line-height: 1;
`;

const Context = styled.p`
  font-size: 12px;
  font-weight: 600;
`;

const Content = styled.div``;

const Avatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid silver;
  object-fit: cover;
`;

const Holder = styled.div`
  display: flex;
  margin: 20px;
  gap: 10px;
  width: 300px;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid silver;
`;

const Text = styled.p`
  margin-left: 20px;
  margin-top: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-weight: 700;
`;
const Button = styled.button`
  margin-top: 20px;
  background-color: darkorange;
  /* color: white; */
  border: 0;
  outline: none;
  padding: 10px 15px;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
`;

const InputValue = styled.input`
  padding: 5px;
  width: 95%;
  border-radius: 3px;
  border: 1px solid silver;
  height: 20px;
  outline: none;
`;

const InputLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

const InputHolder = styled.div`
  width: 300px;
  height: 100px;
  border-radius: 3px;
  border: 1px solid silver;
  margin: 20px;
  padding: 10px;
`;
