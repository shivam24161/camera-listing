import React, { useContext } from "react";
import { MyContext } from "../context/Context";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "react-feather";

const Pagination = () => {
  const {
    data,
    count: { start, end, selectedCount },
    setCount,
  } = useContext(MyContext);

  const handlePageNext = () => {
    setCount((count) => ({
      ...count,
      start: count.start + count.selectedCount,
      end: count.end + count.selectedCount,
    }));
  };

  const handlePagePrev = () => {
    setCount((count) => ({
      ...count,
      start: count.start - count.selectedCount,
      end: count.end - count.selectedCount,
    }));
  };

  return (
    <div className="pixel-pagination">
      <select
        value={selectedCount}
        onChange={(e) =>
          setCount(() => ({
            start: 0,
            end: Number(e.target.value),
            selectedCount: Number(e.target.value),
          }))
        }
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={30}>30</option>
        <option value={40}>40</option>
      </select>
      <div className="pixel-page__container">
        <span>
          {start + 1} - {end > data?.length ? data.length : end} of{" "}
          {data.length}
        </span>
        <button>
          <ChevronsLeft size={20} />
        </button>
        <button
          onClick={() => handlePagePrev()}
          disabled={selectedCount > start}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handlePageNext()}
          disabled={start + 1 + selectedCount > data.length}
        >
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
