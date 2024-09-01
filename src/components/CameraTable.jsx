import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "../constants/apiUrl";
import { Table } from "../utilities/Table/Table";
import { MyContext } from "../context/Context";
import { classnames } from "../utilities/GlobalFunc/GlobalFunc";
import SelectFilters from "./SelectFilters";
import Pagination from "./Pagination";
import { CheckCircle, Cloud, Info, Smartphone, Trash2 } from "react-feather";
import Progress from "../utilities/Progress/Progress";
import { useRowSelection } from "../utilities/Table/useRowSelection";
import TableSkelton from "./TableSkelton";
import { toast } from "react-toastify";
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
  const notify = (msg) =>
    toast(msg, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <CheckCircle size={16} color="#085408" />,
    });
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
    result.status === 200
      ? notify("Status Updated")
      : notify("Something went wrong");
    fetchApi();
  };

  const handleRowDeletion = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
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
            <span className="pixel-camera-name">{item?.name}</span>
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
        <Table.Cell>
          <span className="pixel-task">{`${item?.tasks} Tasks`}</span>
        </Table.Cell>
        <Table.Cell>
          <div
            className={classnames({
              "pixel-status": true,
              "status-active": item?.status === "Active",
              "status-inactive": item?.status === "Inactive",
            })}
            onClick={() =>
              item?.status === "Active"
                ? handleCameraStatus(item?.id, "Inactive")
                : handleCameraStatus(item?.id, "Active")
            }
            title="update status"
          >
            {item?.status}
          </div>
        </Table.Cell>
        <Table.Cell>
          <button
            className="pixel-action__icon"
            onClick={() => handleRowDeletion(item?.id)}
            title="delete this row"
          >
            <Trash2 size={16} color="rgb(255,75,75)" />
          </button>
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
