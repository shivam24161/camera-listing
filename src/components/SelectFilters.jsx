import React, { useContext } from "react";
import { MyContext } from "../context/Context";
import ReactSelect from "react-select";

const SelectFilters = (props) => {
  const { data, setData, mainData } = useContext(MyContext);
  const { locationData } = props;

  const handleLocationFilter = (val) => {
    const filterData = mainData.filter((item) => item.location === val);
    setData(filterData);
  };

  const handleStatusFilter = (val) => {
    const filterData = mainData.filter((item) => item.status === val);
    setData(filterData);
  };

  return (
    <div className="pixel-select-filter">
      <ReactSelect
        className="react-select"
        isLoading={data?.length === 0}
        options={locationData}
        placeholder="Location"
        isClearable
        onChange={(val) => {
          if (val) {
            handleLocationFilter(val?.value);
          } else {
            setData(mainData);
          }
        }}
      />
      <ReactSelect
        className="react-select"
        isLoading={data?.length === 0}
        options={[
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ]}
        placeholder="Status"
        isClearable
        isSearchable={false}
        onChange={(val) => {
          if (val) {
            handleStatusFilter(val?.value);
          } else {
            setData(mainData);
          }
        }}
      />
    </div>
  );
};

export default SelectFilters;
