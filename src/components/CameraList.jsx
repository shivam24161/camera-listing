import React, { useContext, useState } from "react";
import CameraTable from "./CameraTable";
import { MyContext } from "../context/Context";

const CameraList = () => {
  const [searchVal, setSearchVal] = useState("");
  const { data, setData, mainData } = useContext(MyContext);

  const handleSearch = (val) => {
    const filterData = mainData.filter((item) => item.name.toLowerCase().includes(val.toLowerCase()));
    setData(filterData);
  };

  return (
    <div className="pixel-search__wrapper">
      <div className="pixel-search__container">
        <div>
          <h4>Cameras</h4>
          <p>Manage your cameras here</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by camera name"
            value={searchVal}
            onChange={(e) => {
              setSearchVal(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <CameraTable />
    </div>
  );
};

export default CameraList;
