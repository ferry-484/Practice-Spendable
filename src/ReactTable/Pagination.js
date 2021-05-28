import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  NavigateBefore,
  NavigateNext,
  FirstPage,
  LastPage
} from "@material-ui/icons";
import "./reactTable.css";

const Pagination = ({
  dataPerPage,
  totalData,
  paginate,
  initialPage,
  dataRange
}) => {
  const rows = parseInt(localStorage.getItem("rows"));
  const [defaultRows, setRows] = useState(rows);
  const [pageNumber, setPageNumber] = useState(initialPage);
  // const [paginationRange, setRange] = useState([
  //   1,
  //   "...",
  //   Math.ceil(totalData / rows)
  // ]);
  const pageNumbers = [];
  const NumberOfPages = totalData / defaultRows;

  for (let i = 1; i <= Math.ceil(NumberOfPages); i++) {
    pageNumbers.push(i);
  }

  const handlePageRows = e => {
    setPageNumber(1);
    localStorage.setItem("rows", e.target.value);

    setRows(e.target.value);

    paginate(1 * e.target.value, e.target.value);

    // findRange(1, Math.ceil(totalData / e.target.value));
  };

  const handlePageNumber = number => {
    setPageNumber(number);

    paginate(number * rows, defaultRows);

    // findRange(number, Math.ceil(NumberOfPages));
  };

  // const findRange = (c, m) => {
  //   let delta = 2,
  //     range = [],
  //     rangeWithDots = [],
  //     l;

  //   range.push(1);
  //   for (let i = c - delta; i <= c + delta; i++) {
  //     if (i < m && i > 1) {
  //       range.push(i);
  //     }
  //   }
  //   range.push(m);

  //   for (let i of range) {
  //     if (l) {
  //       if (i - l === 2) {
  //         rangeWithDots.push(l + 1);
  //       } else if (i - l !== 1) {
  //         rangeWithDots.push("...");
  //       }
  //     }
  //     rangeWithDots.push(i);
  //     l = i;
  //   }

  //   setRange(rangeWithDots);
  // };

  return (
    <div className="paginationBlock">
      <FormControl>
        <InputLabel id="demo-simple-select-label">Items per page :</InputLabel>
        <Select
          id="demo-simple-select"
          onChange={handlePageRows}
          value={defaultRows}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>
      <p>
        <span>
          {dataRange.first} - {dataRange.last}
        </span>
        of <span>{totalData}</span>
      </p>
      <nav className="paginationNav">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              href=""
              onClick={() =>
                pageNumber !== 1 ? handlePageNumber(pageNumber - 1) : ""
              }
            >
              <FirstPage />
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Previous"
              onClick={() =>
                pageNumber !== 1 ? handlePageNumber(pageNumber - 1) : ""
              }
            >
              <NavigateBefore />
            </a>
          </li>

          {/* {totalData > defaultRows ? (
            paginationRange.map((number) => (
              <li key={number} className="page-item">
                <a
                  style={{
                    border: "1px solid rgb(0, 67, 121);",
                    color: pageNumber === number ? "white" : "#004379",
                    backgroundColor: pageNumber === number ? "#020f1f" : "",
                  }}
                  onClick={() =>
                    number === "..." ? "" : handlePageNumber(number)
                  }
                  className="page-link"
                  active
                >
                  {number}
                </a>
              </li>
            ))
          ) : (
            <li key={1} className="page-item">
              <a
                style={{
                  color: "white",
                  backgroundColor: "#020f1f",
                }}
                className="page-link"
                active
              >
                {1}
              </a>
            </li>
          )} */}

          <li className="page-item">
            <a
              className="page-link"
              aria-label="Next"
              onClick={() =>
                pageNumber < NumberOfPages
                  ? handlePageNumber(pageNumber + 1)
                  : ""
              }
            >
              <NavigateNext />
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              aria-label="Next"
              onClick={() =>
                pageNumber < NumberOfPages
                  ? handlePageNumber(pageNumber + 1)
                  : ""
              }
            >
              <LastPage />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
