import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import { Table } from "../utilities/Table/Table";
import { MyContext } from "../context/Context";
import { classnames } from "../utilities/GlobalFunc/GlobalFunc";
import SelectFilters from "./SelectFilters";
import Pagination from "./Pagination";
import { Cloud, Info, Slash, Smartphone } from "react-feather";
import Progress from "../utilities/Progress/Progress";
import { useRowSelection } from "../utilities/Table/useRowSelection";
import TableSkelton from "./TableSkelton";
import "./Camera.css";

const CameraTable = () => {
  const { getList } = apiUrl;
  const [loading, setLoading] = useState(true);
  const {
    data,
    setData,
    setMainData,
    count: { start, end },
  } = useContext(MyContext);
  const [locationData, setLocationData] = useState([]);
  const { selectedRows, handleSelectionChange } = useRowSelection(
    data?.slice(start, end)
  );

  const fetchApi = async () => {
    setLoading(true);
    const res = await fetch(getList, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
      },
    });
    const result = await res.json();
    setData(result?.data);
    setMainData(result?.data);
    setLoading(false);
    const newData = [...new Set(result?.data?.map((item) => item.location))];
    const filteredData = newData.map((item) => ({
      label: item,
      value: item,
    }));
    setLocationData(filteredData);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleCameraStatus = async (ind, UpdateStatus) => {
    const payload = { id: ind, status: UpdateStatus };
    const res = await fetch(apiUrl.updateStatus, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    fetchApi();
  };

  const tableRow = data?.slice(start, end)?.map((item, ind) => {
    return (
      <Table.Row
        key={item.id}
        id={item.id}
        selected={selectedRows.includes(item.id)}
      >
        <Table.Cell>
          <div
            className={classnames({
              "pixel-item__name": true,
              "pixel-camera__offline": item?.current_status === "Offline",
              "pixel-camera__online": item?.current_status === "Online",
            })}
          >
            <span className="camera-status"></span>
            <span>{item?.name}</span>
            {item?.hasWarning && <Info size={16} color="#ffa500" />}
          </div>
        </Table.Cell>
        <Table.Cell>
          <div className="pixel-health__wrapper">
            <div className="pixel-health-1">
              <Cloud size={16} color="gray" />
              <Progress
                borderColor={
                  item?.health?.cloud === "A"
                    ? "#008000"
                    : item?.health?.cloud !== "A"
                    ? "#ffa500"
                    : "rgb(214, 211, 211)"
                }
              >
                {item?.health?.cloud}
              </Progress>
            </div>
            <div className="pixel-health-2">
              <Smartphone size={16} color="gray" />
              <Progress
                borderColor={
                  item?.health?.device === "A"
                    ? "#008000"
                    : item?.health?.device !== "A"
                    ? "#ffa500"
                    : "rgb(214, 211, 211)"
                }
              >
                {item?.health?.device}
              </Progress>
            </div>
          </div>
        </Table.Cell>
        <Table.Cell>{item?.location}</Table.Cell>
        <Table.Cell>{item?.recorder === "" ? "N/A" : item.recorder}</Table.Cell>
        <Table.Cell>{`${item?.tasks} Tasks`}</Table.Cell>
        <Table.Cell>
          <div
            className={classnames({
              "pixel-status": true,
              "status-active": item?.status === "Active",
              "status-inactive": item?.status === "Inactive",
            })}
          >
            {item?.status}
          </div>
        </Table.Cell>
        <Table.Cell>
          {item?.status === "Active" ? (
            <button
              className="pixel-action__icon"
              onClick={() => handleCameraStatus(item?.id, "Inactive")}
            >
              <Slash size={16} color="rgb(243, 19, 19)" />
            </button>
          ) : (
            <button
              className="pixel-action__icon"
              onClick={() => handleCameraStatus(item?.id, "Active")}
            >
              <svg
                stroke="rgb(6, 125, 6)"
                fill="rgb(6, 125, 6)"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
              </svg>
            </button>
          )}
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <div className="pixel-table__container">
      <SelectFilters locationData={locationData} />
      <div>
        {loading ? (
          <TableSkelton />
        ) : (
          <div className="pixel-table__pagContainer">
            <Table
              headings={[
                { title: "NAME" },
                { title: "HEALTH" },
                { title: "LOCATION" },
                { title: "RECORDER" },
                { title: "TASKS" },
                { title: "STATUS" },
                { title: "ACTION" },
              ]}
              selectable={true}
              onRowSelection={handleSelectionChange}
            >
              {tableRow}
            </Table>
            {data?.length > 10 && <Pagination />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraTable;
