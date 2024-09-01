import React, { useEffect, useRef, useState } from "react";
import { classnames } from "../GlobalFunc/GlobalFunc";
import "./Table.css";

const Table = (props) => {
  const { headings, children, selectable, onRowSelection } = props;
  const [selectAll, setSelectAll] = useState(false);
  const checkboxRef = useRef();

  useEffect(() => {
    const handleIndeterminate = () => {
      const isIndermonate = children.some((child) => child.props.selected);
      if (isIndermonate) {
        checkboxRef.current.indeterminate = true;
      } else {
        setSelectAll(false);
        checkboxRef.current.indeterminate = false;
      }
    };

    if (selectable && children && children.length > 0) {
      const isAllSelected = children.every((child) => child.props.selected);
      if (isAllSelected) {
        checkboxRef.current.indeterminate = false;
        setSelectAll(true);
      } else {
        handleIndeterminate();
      }
    }
  }, [children,selectable]);

  const handleSelectAll = () => {
    if (onRowSelection) {
      if (selectAll) {
        onRowSelection([]);
      } else {
        const allIds = React.Children.map(children, (child) => child.props.id);
        onRowSelection(allIds);
      }
      setSelectAll(!selectAll);
    }
  };

  return (
    <div className="pixel-table__wrapper">
      <table className="pixel-table" role="table">
        <thead>
          <tr>
            {selectable && (
              <td className="pixel-table__heading pixel-table__headingCheckboxCell">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  ref={checkboxRef}
                  checked={selectAll}
                />
              </td>
            )}
            {headings.map((ele) => {
              return (
                <th
                  key={ele?.id ? ele.id : ele.title}
                  className="pixel-table__heading"
                >
                  <div className="flex gap-8 justify-between align-center">
                    <span>{ele.title}</span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              selectable,
              onRowSelection,
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

const Row = (props) => {
  const { children, selectable, id, onRowSelection, selected } = props;
  return (
    <tr
      className={classnames({
        "pixel-table__row": true,
        "pixel-table__row--selected": selected,
      })}
      id={id}
    >
      {selectable && (
        <td className="pixel-table__cell pixel-table__checkboxCell">
          <input
            type="checkbox"
            onChange={() => {
              onRowSelection(id);
            }}
            checked={selected}
          />
        </td>
      )}
      {children}
    </tr>
  );
};

const Cell = (props) => {
  const { children } = props;
  return <td className="pixel-table__cell">{children}</td>;
};

Table.Row = Row;
Table.Cell = Cell;

export { Table };
