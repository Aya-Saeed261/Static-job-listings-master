import { useState, useEffect, useLayoutEffect } from "react";

import Job from "./job";
import Key from "./key";

import headerDes from "../images/bg-header-desktop.svg";
import headerMob from "../images/bg-header-mobile.svg";

const dataURL = "data.json";

const App = () => {
  const [isScreenLarge, setIsScreenLarge] = useState(true);
  const [data, setData] = useState([]);
  const [filterKeys, setFilterKeys] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = (filter, category) => {
    let filterIndx = filterKeys.findIndex(
      (obj) => obj.filter === filter && obj.category === category
    );
    if (filterIndx !== -1) return;
    const filterArr = [...filterKeys, { filter, category }];
    setFilterKeys(filterArr);
    const dataArr = [...filteredData];
    filterItems(filterArr, dataArr);
  };

  const filterItems = (arr, dataArr) => {
    const filteredArr = dataArr.filter((obj) => {
      let isMatched = true;
      for (let i = 0; i < arr.length; i++) {
        const { filter, category } = arr[i];
        if (obj[category].indexOf(filter) === -1) {
          isMatched = false;
          break;
        }
      }
      if (isMatched) return obj;
    });
    setFilteredData(filteredArr);
  };

  const handleRemove = (filter) => {
    const filterArr = [...filterKeys];
    const indx = filterArr.findIndex((obj) => obj.filter === filter);
    filterArr.splice(indx, 1);
    setFilterKeys(filterArr);
    const dataArr = [...data];
    filterItems(filterArr, dataArr);
  };

  useLayoutEffect(() => {
    function updateHeader() {
      setIsScreenLarge(window.innerWidth > 767 ? true : false);
    }
    window.addEventListener("resize", updateHeader);
    updateHeader();

    return () => {
      window.removeEventListener("resize", updateHeader);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    fetch(dataURL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="bg-light-cyan">
      <div className="bg-dark-cyan">
        {isScreenLarge ? (
          <img src={headerDes} alt="" />
        ) : (
          <img src={headerMob} alt="" />
        )}
      </div>
      <div className="position-relative pt-md-3">
        {filterKeys.length > 0 ? (
          <div className="filter-bar content-width shadowed rounded-3 bg-white py-3 px-4 mx-auto d-flex align-items-center justify-content-between gap-3">
            <div className="d-flex gap-3 flex-wrap">
              {filterKeys.map((obj, indx) => (
                <Key key={indx} filter={obj.filter} onRemove={handleRemove} />
              ))}
            </div>
            <button
              type="btn"
              className="clear-btn btn cyan p-0"
              onClick={() => {
                setFilterKeys([]);
                setFilteredData(data);
              }}
            >
              Clear
            </button>
          </div>
        ) : (
          ""
        )}
        <ul className="content-width list-unstyled mb-0 px-4 px-md-5 px-lg-0 mx-auto py-5">
          {filteredData.length > 0
            ? filteredData.map((job, indx, arr) => (
                <li
                  key={job.id}
                  className={`${indx !== arr.length - 1 ? "mb-5" : ""} mb-md-4`}
                >
                  <Job job={job} onFilter={handleFilter} />
                </li>
              ))
            : ""}
        </ul>
      </div>
    </main>
  );
};

export default App;
