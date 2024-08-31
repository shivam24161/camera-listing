import React, { createContext, useState } from "react";
export const MyContext = createContext();
const Context = (props) => {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  return (
    <MyContext.Provider value={{ data, setData, mainData, setMainData }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default Context;
