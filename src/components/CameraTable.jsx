import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import { Table } from "../utilities/Table/Table";
import { MyContext } from "../context/Context";
import { classnames } from "../utilities/GlobalFunc/GlobalFunc";
import SelectFilters from "./SelectFilters";
import Pagination from "./Pagination";
import { Cloud, Info, Smartphone } from "react-feather";
import Progress from "../utilities/Progress/Progress";
import "./Camera.css";

const CameraTable = () => {
  const { getList } = apiUrl;
  const [loading, setLoading] = useState(true);
  const { data, setData, mainData, setMainData } = useContext(MyContext);
  const [locationData, setLocationData] = useState([]);

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

  const tableRow = data?.map((item, ind) => {
    return (
      <Table.Row key={ind}>
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
            <button onClick={() => handleCameraStatus(item?.id, "Inactive")}>
              InActive
            </button>
          ) : (
            <button onClick={() => handleCameraStatus(item?.id, "Active")}>
              Active
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
          "Loading..."
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
              // selectable={true}
              // onRowSelection={handleSelectionChange}
            >
              {tableRow}
            </Table>
            <Pagination />
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraTable;
