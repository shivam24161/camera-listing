import React from "react";
import Skeleton from "react-loading-skeleton";
import { Table } from "../utilities/Table/Table";

const TableSkelton = () => {
  const rowsSkelton = {
    checkbox: <Skeleton />,
    name: <Skeleton />,
    health: <Skeleton />,
    location: <Skeleton />,
    recorder: <Skeleton />,
    tasks: <Skeleton />,
    status: <Skeleton />,
    action: <Skeleton />,
  };

  const makeData = Array.from({ length: 10 })
    .fill(rowsSkelton)
    .map((ele, ind) => {
      return (
        <Table.Row key={ind} id={ind}>
          <Table.Cell>{ele.checkbox}</Table.Cell>
          <Table.Cell>{ele.name}</Table.Cell>
          <Table.Cell>{ele.health}</Table.Cell>
          <Table.Cell>{ele.location}</Table.Cell>
          <Table.Cell>{ele.recorder}</Table.Cell>
          <Table.Cell>{ele.tasks}</Table.Cell>
          <Table.Cell>{ele.status}</Table.Cell>
          <Table.Cell>{ele.action}</Table.Cell>
        </Table.Row>
      );
    });

  return (
    <div className="table-skelton">
      <Table
        headings={[
          {
            title: <Skeleton width={50} />,
            id: 1,
          },
          {
            title: <Skeleton width={50} />,
            id: 2,
          },
          {
            title: <Skeleton width={50} />,
            id: 3,
          },
          {
            title: <Skeleton width={50} />,
            id: 4,
          },
          {
            title: <Skeleton width={50} />,
            id: 5,
          },
          {
            title: <Skeleton width={50} />,
            id: 6,
          },
          {
            title: <Skeleton width={50} />,
            id: 7,
          },
          {
            title: <Skeleton width={50} />,
            id: 8,
          },
        ]}
        selectable={false}
      >
        {makeData}
      </Table>
    </div>
  );
};

export default TableSkelton;
