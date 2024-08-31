import React, { useContext, useState } from "react";
import ReactSelect from "react-select";
import { MyContext } from "../context/Context";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";

const Pagination = () => {
  const { data, setData, mainData } = useContext(MyContext);
  const [count, setCount] = useState({
    selectedCount: 10,
    start: 1,
    end: 10,
  });
  return (
    <div className="pixel-pagination">
      <ReactSelect
        // value={count.selectedCount}
        // defaultValue={count.selectedCount}
        value={10}
        defaultValue={10}
        isSearchable={false}
        options={[
          {
            label: 10,
            value: 10,
          },
          {
            label: 20,
            value: 20,
          },
          {
            label: 30,
            value: 30,
          },
          {
            label: 40,
            value: 40,
          },
        ]}
        menuPlacement="auto"
      />
      <div>
        <span>
          {count.start} - {count.end} of {data.length}
        </span>
        <button>
          <ChevronsLeft size={20} />
        </button>
        <button>
          <ChevronLeft size={20} />
        </button>
        <button>
          <ChevronRight size={20} />
        </button>
        <button>
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
