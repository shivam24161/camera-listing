import React, { createContext, useState } from "react";
export const MyContext = createContext();
const Context = (props) => {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [count, setCount] = useState({
    selectedCount: 10,
    start: 0,
    end: 10,
  });
  return (
    <MyContext.Provider
      value={{ data, setData, mainData, setMainData, count, setCount }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;
